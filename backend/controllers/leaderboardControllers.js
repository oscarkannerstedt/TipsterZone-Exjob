import userModel from "../models/userModel.js";

//Get top 30 users based on total points.
export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await userModel
      .find({})
      .sort({ total_points: -1 })
      .limit(30);

    const leaderboard = topUsers.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      total_points: user.total_points,
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    res
      .status(500)
      .json({ message: "Server error while fetching leaderboard" });
  }
};
