import { useEffect, useState } from "react";
import { IMatchPrediction } from "../types/Match";
import { useParams } from "react-router-dom";
import { fetchPredictionsByUserId } from "../services/predictionServices";

export const LeaderboardUsersPredictions = () => {
  const [predictions, setPredictions] = useState<IMatchPrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useParams<{ userId: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPredictionsByUserId(userId);
        setPredictions(data);
      } catch (err) {
        console.error("Failed to fetch predictions:", err);
        setError(
          "Kunde inte hämta tippningarna för denna användare, vänlig försök igen om en stund."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <p>Loading predictions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Tippningar</h1>

      <ul>
        {predictions.map((prediction) => (
          <li key={prediction.match_id}>
            <p>
              {prediction.match_id}, Prediction: {prediction.predicted_outcome}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardUsersPredictions;
