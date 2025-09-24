import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  type: { type: String, enum: ["count", "sentiment"], required: true },
  wordCount: { type: Number, required: true },
  sentiment: { type: Number },
  topWords: [{ word: String, count: Number }],
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", LogSchema);
export default Log;
