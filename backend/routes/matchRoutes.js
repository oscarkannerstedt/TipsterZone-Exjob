import express from "express";
import fetchAllMatches from "../controllers/matchControllers.js";

const router = express.Router();

router.get("/", fetchAllMatches);

export default router;
