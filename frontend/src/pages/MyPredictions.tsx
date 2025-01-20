import { useEffect, useState } from "react";
import { IMatchPrediction } from "../types/Match";
import { fetchPredictionsByUserId } from "../services/predictionServices";
import { formatTime } from "../utils/formatTime";
import {
  getPredictionDescription,
  getTimeUntilMatch,
} from "../utils/predictionUtils";

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
          const matchA = a.match ? new Date(a.match.utcDate) : new Date();
          const matchB = b.match ? new Date(b.match.utcDate) : new Date();

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
      <h1>Tippningar</h1>

      {predictions.map((prediction) => {
        const timeUntilMatch = prediction.match
          ? getTimeUntilMatch(prediction.match.utcDate)
          : null;

        const isMatchFinished =
          prediction.match && new Date(prediction.match.utcDate) < new Date();
        const matchResult = prediction.match?.result;

        return (
          <div
            key={`${prediction.id}-${prediction.match_id}`}
            className="userPrediction-card"
          >
            <div className="match-info">
              {prediction.match ? (
                <>
                  <p className="teams-name">
                    {prediction.match.homeTeam.name} -{" "}
                    {prediction.match.awayTeam.name}
                  </p>
                  <p>{formatTime(prediction.match.utcDate)}</p>
                </>
              ) : (
                <p>Match data saknas.</p>
              )}
            </div>

            <div className="prediction-info">
              {prediction.match ? (
                <p>
                  Din tippning:
                  {getPredictionDescription(
                    prediction.predicted_outcome,
                    prediction.match.homeTeam.name,
                    prediction.match.awayTeam.name
                  )}
                </p>
              ) : (
                <p>Din tippning: Ingen tippning hittades.</p>
              )}
              {prediction.summary && <p>Motivering: {prediction.summary}</p>}

              {prediction.match ? (
                isMatchFinished ? (
                  matchResult ? (
                    <p>
                      Resultat: {matchResult.home} - {matchResult.away}
                    </p>
                  ) : (
                    <p>Resultat saknas.</p>
                  )
                ) : timeUntilMatch && timeUntilMatch > 20 ? (
                  <button className="delete-prediction-button">
                    Radera Tippning
                  </button>
                ) : (
                  <p>Matchen är inte färdig spelad ännu.</p>
                )
              ) : (
                <p>Matchdata saknas.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyPredicitons;
