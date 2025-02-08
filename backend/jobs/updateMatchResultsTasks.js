import cron from "node-cron";
import { updateMatchResultsAndPredicitons } from "../controllers/matchControllers.js";

// Scheduled to run 01.00 & 18.00 every day
cron.schedule("0 0 * * *", async () => {
  await updateMatchResultsAndPredicitons();
});
