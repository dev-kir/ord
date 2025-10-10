import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

import countRoutes from "./routes/count.route.js";
import sentimentRoutes from "./routes/sentiment.route.js";
import statsRoutes from "./routes/stats.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2306;

// app.use(cors({ origin: "http://localhost:5173" })); // or "*" for testing
app.use(cors({ origin: "*" }));
app.use(express.json());
app.set("trust proxy", true);

app.use("/api/count", countRoutes);
app.use("/api/sentiment", sentimentRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
