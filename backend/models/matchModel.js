import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  match_id: { type: String, required: true, unique: true },
  team_home: { type: String, required: true },
  team_away: { type: String, required: true },
  match_date: { type: Date, required: true },
  status: { type: String, required: true },
  result: { type: String },
  competition: { type: String, required: true },
});

export default mongoose.model("Match", matchSchema);
