import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/leaderboardServices";
import { ILeaderboardUser } from "../types/Leaderboard";

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<ILeaderboardUser[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    <div>
      <h1>Topp Lista</h1>

      {leaderboard.length > 0 ? (
        <div className="leaderboard-cards">
          {leaderboard.map((user) => (
            <div key={user.rank} className="leaderboard-card">
              <div className="rank-box">{user.rank}</div>

              <div className="user-info">
                <p className="username">{user.username}</p>
                <div className="user-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`star ${
                        i < Math.floor(user.total_points / 20) ? "filled" : ""
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="point-box">{user.total_points}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>Laddar Top Lista...</p>
      )}
    </div>
  );
};

export default Leaderboard;
