import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  match_id: { type: Number, required: true, unique: true },
  team_home: { type: String, required: true },
  team_away: { type: String, required: true },
  match_date: { type: Date, required: true },
  status: { type: String, required: true },
  result: {
    home: { type: Number, required: false },
    away: { type: Number, required: false },
  },
  competition: { type: String, required: true },
});

export default mongoose.model("Match", matchSchema);
