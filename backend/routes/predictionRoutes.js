import express from "express";
import {
  createPrediction,
  deletePrediction,
  updatePrediction,
} from "../controllers/predictionController.js";

const router = express.Router();

router.post("/create", createPrediction);
router.put("/:predictionId", updatePrediction);
router.delete("/:predictionId", deletePrediction);

export default router;
