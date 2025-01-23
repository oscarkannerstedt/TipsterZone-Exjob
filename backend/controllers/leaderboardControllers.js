import userModel from "../models/userModel.js";
import NodeCache from "node-cache";

// cache updates every 10 minutes
const cache = new NodeCache({ stdTTL: 600 });

//Get top 30 users based on total points.
export const getLeaderboard = async (req, res) => {
  try {
    //Check if leaderborad exist in cache
    const cacheLeaderboard = cache.get("leaderboard");

    if (cacheLeaderboard) {
      console.log("Leaderboard from cache");
      return res.status(200).json(cacheLeaderboard);
    }

    const topUsers = await userModel
      .find({})
      .sort({ total_points: -1 })
      .limit(30);

    const leaderboard = topUsers.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      total_points: user.total_points,
      userId: user._id,
    }));

    //Save leaderboard in cache
    cache.set("leaderboard", leaderboard);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    res
      .status(500)
      .json({ message: "Server error while fetching leaderboard" });
  }
};
