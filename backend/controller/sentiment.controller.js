import Log from "../models/log.model.js";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

export const analyzeSentiment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }

    const words = text.trim().split(/\s+/);
    const wordCount = words.length;

    // if (wordCount > 1000) {
    //   return res.status(400).json({ error: "Text too long. Max 1000 words." });
    // }

    const result = sentiment.analyze(text);

    const log = new Log({
      type: "sentiment",
      wordCount,
      sentiment: result.score,
    });
    await log.save();

    res.json({ wordCount, sentiment: result.score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
