import { useEffect, useState } from "react";
import { IMatch, IMatchPrediction } from "../types/Match";
import {
  deletePredictionByID,
  fetchPredictionsByUserId,
} from "../services/predictionServices";
import { formatTime } from "../utils/formatTime";
import {
  getMatchOutcome,
  getPredictionDescription,
  getTimeUntilMatch,
} from "../utils/predictionUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

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
          const matchA = a.match ? new Date(a.match.utcDate) : new Date(0);
          const matchB = b.match ? new Date(b.match.utcDate) : new Date(0);

          if (matchA > now && matchB > now) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }

          if (matchA > now) return -1;
          if (matchB > now) return 1;

          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
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

  const handleDeletePrediction = async (
    predictionId: string,
    setPredictions: React.Dispatch<React.SetStateAction<IMatchPrediction[]>>
  ) => {
    console.log("Deleting prediction with id:", predictionId);
    if (!window.confirm("Är du säker på att du vill radera tippningen?")) {
      return;
    }

    try {
      await deletePredictionByID(predictionId);
      setPredictions((prevPredictions) =>
        prevPredictions.filter((prediction) => prediction._id !== predictionId)
      );
    } catch (error) {
      console.error("Error while deleting prediction:", error);
      alert("Något gick fel vid borttagning av tippningen.");
    }
  };

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

        const isPredictionCorrect = (
          predictedOutcome: string,
          matchResult: IMatch["result"] | null
        ) => {
          if (!matchResult) return false;
          const matchOutcome = getMatchOutcome(
            matchResult.home,
            matchResult.away
          );

          return predictedOutcome === matchOutcome;
        };

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
                    <div className="result-container">
                      <hr />
                      <div className="prediction-result">
                        <span className="icon-container">
                          {isPredictionCorrect(
                            prediction.predicted_outcome,
                            matchResult
                          ) ? (
                            <span className="icon-success">
                              <FontAwesomeIcon icon={faCheckCircle} />
                            </span>
                          ) : (
                            <span className="icon-failure">
                              <FontAwesomeIcon icon={faTimesCircle} />
                            </span>
                          )}

                          <span className="result-status">
                            {matchResult.home === matchResult.away
                              ? "Oavgjort"
                              : matchResult.home > matchResult.away
                              ? `${prediction.match.homeTeam.shortName}`
                              : `${prediction.match.awayTeam.name}`}
                          </span>
                        </span>
                        <span className="result-text">
                          Resultat:{" "}
                          <strong>
                            {matchResult.home} - {matchResult.away}
                          </strong>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p>Resultat saknas.</p>
                  )
                ) : timeUntilMatch && timeUntilMatch > 20 ? (
                  <button
                    className="delete-prediction-button"
                    onClick={() =>
                      handleDeletePrediction(prediction._id, setPredictions)
                    }
                  >
                    Radera Tippning
                  </button>
                ) : (
                  <div>
                    <hr />
                    <p>Matchen är inte färdig spelad ännu.</p>
                  </div>
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
