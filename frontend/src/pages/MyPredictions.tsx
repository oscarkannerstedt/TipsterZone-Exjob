import { useEffect, useState } from "react";
import { IMatchPrediction } from "../types/Match";
import { fetchPredictionsByUserId } from "../services/predictionServices";
import { formatTime } from "../utils/formatTime";

export const MyPredicitons = () => {
  const [predictions, setPredictions] = useState<IMatchPrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserPredictions = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Du måste vara inloggad för att kunna se dina tippningar.");
        return;
      }

      try {
        setLoading(true);
        const fetchedPredictions = await fetchPredictionsByUserId(userId);

        //Sort user predictions, matches not started yet comes first
        const sortedPredictions = fetchedPredictions.sort((a, b) => {
          const now = new Date();
          const matchA = new Date(a.match.utcDate);
          const matchB = new Date(b.match.utcDate);

          if (matchA > now && matchB > now) {
            return matchA.getTime() - matchB.getTime();
          } else if (matchA > now) {
            return -1;
          } else if (matchB > now) {
            return 1;
          } else {
            return matchA.getTime() - matchB.getTime();
          }
        });

        setPredictions(sortedPredictions);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        alert(
          "Något gick fel när dina tippningar skulle hämtas, var vänlig försök igen om en stund."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserPredictions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (predictions.length === 0) {
    return <p>Inga tippningar hittades.</p>;
  }

  return (
    <div className="userPredictions-wrapper">
      <h1>Mina tippningar</h1>

      {predictions.map((prediction) => (
        <div key={prediction.id} className="userPrediction-card">
          <div className="match-info">
            <p>
              {prediction.match.homeTeam.shortName} -{" "}
              {prediction.match.awayTeam.shortName}
            </p>
            <p>{formatTime(prediction.match.utcDate)}</p>
          </div>

          <div className="prediction-info">
            <p>Din tippning: {prediction.predictedOutcome}</p>
            <p>
              Resultat:
              {prediction.match.result
                ? `${prediction.match.result.home} - ${prediction.match.result.away}`
                : "Matchen är inte färdig spelad ännu."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPredicitons;
