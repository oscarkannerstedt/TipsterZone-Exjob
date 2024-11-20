import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  match_id: {
    type: Number,
    required: true,
  },
  predicted_outcome: {
    type: String,
    enum: ["1", "X", "2"],
    required: true,
  },
  points_awarded: { type: Number, default: 0 },
  summary: { type: String },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Prediction", predictionSchema);
