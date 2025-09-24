import mongoose from "mongoose";
import Log from "../log.model.js"; // Adjust path as needed

// Sample words for generating random topWords
const sampleWords = [
  "the",
  "and",
  "to",
  "of",
  "a",
  "in",
  "is",
  "it",
  "you",
  "that",
  "he",
  "was",
  "for",
  "on",
  "are",
  "as",
  "with",
  "his",
  "they",
  "i",
  "at",
  "be",
  "this",
  "have",
  "from",
  "or",
  "one",
  "had",
  "by",
  "word",
  "but",
  "not",
  "what",
  "all",
  "were",
  "we",
  "when",
  "your",
  "can",
  "said",
  "there",
  "each",
  "which",
  "she",
  "do",
  "how",
  "their",
  "if",
  "will",
  "up",
  "other",
  "about",
  "out",
  "many",
  "then",
  "them",
  "these",
  "so",
  "some",
  "her",
  "would",
  "make",
  "like",
  "into",
  "him",
  "has",
  "two",
  "more",
  "very",
  "after",
  "words",
  "first",
  "where",
  "much",
  "through",
  "back",
  "years",
  "work",
  "came",
  "right",
  "just",
  "old",
  "any",
  "same",
  "three",
  "our",
  "man",
  "day",
  "get",
  "use",
  "water",
  "part",
  "find",
  "new",
  "now",
  "long",
  "little",
  "way",
  "come",
  "may",
  "say",
  "great",
  "good",
  "before",
  "must",
  "go",
  "try",
  "kind",
  "hand",
  "high",
  "keep",
  "last",
  "turn",
  "here",
  "why",
  "ask",
  "men",
  "change",
  "went",
  "light",
  "off",
  "need",
  "house",
  "picture",
];

// Helper function to get random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to get random float between min and max
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// Helper function to generate random top words
function generateTopWords() {
  const numWords = getRandomInt(3, 5);
  const shuffled = [...sampleWords].sort(() => 0.5 - Math.random());
  const selectedWords = shuffled.slice(0, numWords);

  return selectedWords
    .map((word) => ({
      word: word.toLowerCase(),
      count: getRandomInt(1, 50),
    }))
    .sort((a, b) => b.count - a.count);
}

// Helper function to generate random date within a day
function getRandomTimeInDay(date) {
  const start = new Date(date);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomTime;
}

async function seedLogs() {
  try {
    // Connect to MongoDB (adjust connection string as needed)
    await mongoose.connect("mongodb://localhost:27017/ord");
    console.log("Connected to MongoDB");

    // Clear existing logs
    await Log.deleteMany({});
    console.log("Cleared existing logs");

    const logs = [];
    const startDate = new Date("2025-09-21"); // September 21, 2025
    const endDate = new Date("2022-09-21"); // September 21, 2022 (3 years back)

    // Generate logs for each day
    for (
      let currentDate = new Date(startDate);
      currentDate >= endDate;
      currentDate.setDate(currentDate.getDate() - 1)
    ) {
      const logsPerDay = getRandomInt(0, 825);

      for (let i = 0; i < logsPerDay; i++) {
        const type = Math.random() < 0.5 ? "count" : "sentiment";
        const wordCount = getRandomInt(1, 1000);
        const timestamp = getRandomTimeInDay(new Date(currentDate));

        const logData = {
          type,
          wordCount,
          timestamp,
          topWords: generateTopWords(),
        };

        // Add sentiment score only for sentiment type
        if (type === "sentiment") {
          logData.sentiment = parseFloat(getRandomFloat(-1, 1).toFixed(2));
        }

        logs.push(logData);
      }
    }

    console.log(`Generated ${logs.length} log entries`);

    // Insert logs in batches for better performance
    const batchSize = 1000;
    for (let i = 0; i < logs.length; i += batchSize) {
      const batch = logs.slice(i, i + batchSize);
      await Log.insertMany(batch);
      console.log(
        `Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
          logs.length / batchSize
        )}`
      );
    }

    console.log("✅ Seeding completed successfully!");
    console.log(`Total logs created: ${logs.length}`);

    // Display some statistics
    const countLogs = await Log.countDocuments({ type: "count" });
    const sentimentLogs = await Log.countDocuments({ type: "sentiment" });
    console.log(`Count logs: ${countLogs}`);
    console.log(`Sentiment logs: ${sentimentLogs}`);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seeder
seedLogs();
