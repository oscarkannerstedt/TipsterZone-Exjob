import express from "express";
import { getLeaderboard } from "../controllers/leaderboardControllers.js";

const router = express.Router();

router.get("/", getLeaderboard);

export default router;
