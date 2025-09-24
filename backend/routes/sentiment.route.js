import express from "express";
import { analyzeSentiment } from "../controller/sentiment.controller.js";

const router = express.Router();

router.post("/", analyzeSentiment);

export default router;
