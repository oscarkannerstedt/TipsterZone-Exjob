import express from "express";
import matchControllers from "../controllers/matchControllers.js";

const router = express.Router();

router.get("/", matchControllers.fetchAllMatches);

router.get("/:matchId", matchControllers.fetchMatchById);

// Denna är endast under utveckling och skall tas bort sen.
router.get("/update-finished-matches", async (req, res) => {
  try {
    await matchControllers.updateMatchResultsAndPredicitons();
    res.status(200).json({ message: "Match results updated successfully!" });
  } catch (error) {
    console.error("Error updating match results manually:", error);
    res.status(500).json({ message: "Error updating match results" });
  }
});

export default router;
