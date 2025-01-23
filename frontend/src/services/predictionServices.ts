import axios from "axios";
import { IDatabaseMatch, IMatch, IMatchPrediction } from "../types/Match";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

//Create prediction
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

//fetch predictions by userId
export const fetchPredictionsByUserId = async (
  userId: string
): Promise<IMatchPrediction[]> => {
  const response = await axios.get(`${API_URL}/api/predictions/user/${userId}`);
  const predictions = response.data;

  console.log("Fetched predictions:", predictions);

  //For every prediction, get match data from db
  const predictionsWithMatchData = await Promise.all(
    predictions.map(async (prediction: IMatchPrediction) => {
      console.log("Current prediction:", prediction);
      const matchData: IDatabaseMatch = await fetchMatchById(
        prediction.match_id
      );

      const updatedMatchData: IMatch = {
        id: matchData.match_id,
        homeTeam: { name: matchData.team_home, shortName: matchData.team_home },
        awayTeam: { name: matchData.team_away, shortName: matchData.team_away },
        match_date: matchData.match_date,
        utcDate: matchData.match_date,
        status: matchData.status,
        competion: matchData.competition,
        result: matchData.result,
      };

      return {
        ...prediction,
        match: updatedMatchData,
      };
    })
  );

  return predictionsWithMatchData;
};

//fetch match from db with match_id
export const fetchMatchById = async (
  matchId: number
): Promise<IDatabaseMatch> => {
  const response = await axios.get(`${API_URL}/api/matches/${matchId}`);
  return response.data;
};

//Delete prediciton
export const deletePredictionByID = async (predictionId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/predictions/${predictionId}`
    );
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Failed to delete prediction.");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data?.message) {
        throw new Error(error.response.data.message);
      }
    }

    throw new Error("Failed to delete prediction.");
  }
};
