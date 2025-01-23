import { useEffect, useState } from "react";
import { IMatchPrediction } from "../types/Match";
import { useParams } from "react-router-dom";
import { fetchPredictionsByUserId } from "../services/predictionServices";

export const LeaderboardUsersPredictions = () => {
  const [predictions, setPredictions] = useState<IMatchPrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserPredictions = async () => {
      const data = await fetchPredictionsByUserId(userId);
      setPredictions(data);
    };

    fetchUserPredictions();
  }, [userId]);

  return <>Predictions</>;
};

export default LeaderboardUsersPredictions;
