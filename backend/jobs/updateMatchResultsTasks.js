import cron from "node-cron";
import { updateMatchResultsAndPredicitons } from "../controllers/matchControllers.js";

// Scheduled to run 01.00, 15.00, 18.00 & 21.00 every day
cron.schedule("0 1,15,18,21 * * *", async () => {
  await updateMatchResultsAndPredicitons();
});
