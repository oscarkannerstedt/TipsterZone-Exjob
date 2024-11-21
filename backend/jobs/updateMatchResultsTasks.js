import cron from "node-cron";
import { updateMatchResultsAndPredicitons } from "../controllers/matchControllers.js";

// Scheduled to run every two hours
cron.schedule("0 */2 * * *", async () => {
  await updateMatchResultsAndPredicitons();
});
