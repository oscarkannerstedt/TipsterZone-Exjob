import { useEffect, useState } from "react";
import { IMatch, IMatchPrediction } from "../types/Match";
import { useLocation, useParams } from "react-router-dom";
import { fetchPredictionsByUserId } from "../services/predictionServices";
import {
  getMatchOutcome,
  getPredictionDescription,
} from "../utils/predictionUtils";
import { formatTime } from "../utils/formatTime";
import { useHandleNavigation } from "../utils/navigationUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export const LeaderboardUsersPredictions = () => {
  const [predictions, setPredictions] = useState<IMatchPrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const { username, total_points, rank } = location.state || {};
  const [error, setError] = useState<string | null>(null);

  const handleNavigation = useHandleNavigation();

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPredictionsByUserId(userId);
        console.log(data);

        const sortedPredictions = data.sort((a, b) => {
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

  // Function to render the star rating based on the user's rank
  const renderStars = (rank: number) => {
    const stars = Math.ceil((30 - rank) / 6);
    return (
      <>
        <div className="user-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`star ${i < stars ? "filled" : ""}`}>
              ★
            </span>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="leaderboard-predictions-wrapper">
      <button className="go-back-button" onClick={() => handleNavigation()}>
        ← Tillbaka
      </button>

      <div className="user-profile-container">
        <h2>{username}</h2>
        <p>{renderStars(rank)}</p>
        <h3>
          Rank: <span>{rank}</span>
        </h3>
        <h4>
          Poäng: <span>{total_points}</span>
        </h4>
      </div>

      {predictions.map((prediction) => {
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
            className="leaderboard-prediction-card"
          >
            <div className="leaderboard-match-info">
              {prediction.match ? (
                <>
                  <p className="leaderboard-teams-name">
                    {prediction.match.homeTeam.shortName} -{" "}
                    {prediction.match.awayTeam.name}
                  </p>

                  <p className="match-start-time">
                    {formatTime(prediction.match.utcDate)}
                  </p>
                </>
              ) : (
                <p>Match data saknas.</p>
              )}
            </div>

            <div className="leaderboard-prediction-info">
              {prediction.match ? (
                <p>
                  <span className="prediction-text">Tippat:</span>
                  {getPredictionDescription(
                    prediction.predicted_outcome,
                    prediction.match.homeTeam.name,
                    prediction.match.awayTeam.name
                  )}
                </p>
              ) : (
                <p>Tippning: Ingen tippning hittades.</p>
              )}
              {prediction.summary && (
                <p>
                  <span className="summary-text">Motivering:</span>
                  {prediction.summary}
                </p>
              )}

              {prediction.match && isMatchFinished ? (
                matchResult ? (
                  <div className="result-section">
                    <hr />
                    <div className="result">
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
                  <div className="result-section">
                    <hr />
                    <p>Resultat saknas.</p>
                  </div>
                )
              ) : (
                <div className="result-section">
                  <hr />
                  <p>Resultat: Matchen är inte färdigspelad ännu.</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardUsersPredictions;
