import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/leaderboard`);
    console.log(response);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message =
        error.response.data.message || "Error while fetching leaderboard";
      throw new Error(message);
    }
    throw new Error("Server error");
  }
};
