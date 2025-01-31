import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import "./jobs/updateMatchResultsTasks.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();

const app = express();

app.options("*", cors());

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "https://tipsterzone.onrender.com",
      "https://tipsterzone.se",
      "https://www.tipsterzone.se",
      "http://localhost:5173",
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/predictions", predictionRoutes);

app.use("/api/matches", matchRoutes);

app.use("/api/leaderboard", leaderboardRoutes);

const PORT = process.env.PORT || 10000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
  });
}

export default app;
