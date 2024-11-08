import express from "express";
import { createPrediction } from "../controllers/predictionController.js";

const router = express.Router();

router.post("/create", createPrediction);

export default router;
