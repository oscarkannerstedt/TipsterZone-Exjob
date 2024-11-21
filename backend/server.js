import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import "./jobs/updateMatchResultsTasks.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/predictions", predictionRoutes);

app.use("/api/matches", matchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
