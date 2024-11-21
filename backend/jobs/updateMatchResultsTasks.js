import cron from "node-cron";
import { updateMatchResultsAndPredicitons } from "../controllers/matchControllers.js";

// Scheduled to midnight every day
cron.schedule("0 0 * * *", async () => {
  await updateMatchResultsAndPredicitons();
});
