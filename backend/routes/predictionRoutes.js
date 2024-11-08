import express from "express";
import {
  createPrediction,
  deletePrediction,
  getPredictionsByUserId,
  updatePrediction,
} from "../controllers/predictionController.js";

const router = express.Router();

router.post("/create", createPrediction);
router.put("/:predictionId", updatePrediction);
router.delete("/:predictionId", deletePrediction);
router.get("/user/:userId", getPredictionsByUserId);

export default router;
