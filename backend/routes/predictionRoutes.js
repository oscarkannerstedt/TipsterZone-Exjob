import express from "express";
import {
  createPrediction,
  updatePrediction,
} from "../controllers/predictionController.js";

const router = express.Router();

router.post("/create", createPrediction);
router.put("/:predictionId", updatePrediction);

export default router;
