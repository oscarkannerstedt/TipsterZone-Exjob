import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/leaderboardServices";
import { ILeaderboardUser } from "../types/Leaderboard";
import { useHandleNavigation } from "../utils/navigationUtils";

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<ILeaderboardUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleNavigation = useHandleNavigation();

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    getLeaderboard();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="leaderboard-container">
      <h1>Topp Lista</h1>

      {leaderboard.length > 0 ? (
        <div>
          <div className="leaderboard-header">
            <div className="header-box rank-header">Rank</div>
            <div className="header-box user-header">Användarnamn</div>
            <div className="header-box points-header">Poäng</div>
          </div>

          <div className="leaderboard-cards">
            {leaderboard.map((user) => (
              <div key={user.rank} className="leaderboard-card">
                <div className="rank-box">{user.rank}</div>

                <div className="user-info">
                  <p
                    className="username"
                    onClick={() =>
                      handleNavigation("`/userpredictions/${user.userId}`")
                    }
                  >
                    {user.username}
                  </p>
                  <div className="user-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`star ${
                          i < Math.ceil((30 - user.rank) / 6) ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="points-box">{user.total_points}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Laddar Top Lista...</p>
      )}
    </div>
  );
};

export default Leaderboard;
