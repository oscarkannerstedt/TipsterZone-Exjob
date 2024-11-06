const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  total_points: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
