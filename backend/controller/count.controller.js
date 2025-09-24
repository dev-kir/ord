import Log from "../models/log.model.js";

export const analyzeCount = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }

    const words = text
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);
    const wordCount = words.length;

    const freq = {};
    words.forEach((w) => {
      freq[w] = (freq[w] || 0) + 1;
    });

    const topWords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));

    const log = new Log({
      type: "count",
      wordCount,
      topWords,
    });
    await log.save();

    res.json({ wordCount, topWords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
