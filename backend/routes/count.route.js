import express from "express";
import { analyzeCount } from "../controller/count.controller.js";

const router = express.Router();

router.post("/", analyzeCount);

export default router;
