import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

export const fetchMatchesByLeague = async (league: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/matches`, {
      params: { league },
    });

    return response.data.matches;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message =
        error.response.data.message || "Error while fetching matches";
      throw new Error(message);
    }
    throw new Error("Server error");
  }
};
