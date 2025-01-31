import express from "express";
import matchControllers from "../controllers/matchControllers.js";

const router = express.Router();

router.get("/", matchControllers.fetchAllMatches);

router.get("/:matchId", matchControllers.fetchMatchById);

export default router;
