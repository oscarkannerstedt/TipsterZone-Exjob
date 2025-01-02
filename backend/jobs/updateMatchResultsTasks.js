import cron from "node-cron";
import { updateMatchResultsAndPredicitons } from "../controllers/matchControllers.js";

// Scheduled to run every two hours
// cron.schedule("0 */2 * * *", async () => {
//   await updateMatchResultsAndPredicitons();
// });

// Scheduled to run every 10 minutes
cron.schedule("*/3 * * * *", async () => {
  console.log("Cron job körs");
  await updateMatchResultsAndPredicitons();
});
