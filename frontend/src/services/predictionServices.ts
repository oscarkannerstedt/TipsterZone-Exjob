import axios from "axios";
import { IMatchPrediction } from "../types/Match";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

export const createPrediciton = async (prediction: {
  user_id: string;
  match_id: number;
  predicted_outcome: string;
  summary: string;
  league: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/predictions/create?league=${prediction.league}`,
      prediction
    );
    console.log("league from frontend", prediction.league);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.message || "Error create predicition";
      throw new Error(message);
    }
    throw new Error("Server error");
  }
};

export const fetchPredictionsByUserId = async (
  userId: string
): Promise<IMatchPrediction[]> => {
  const response = await axios.get(`${API_URL}/api/predictions/user/${userId}`);
  return response.data;
};
