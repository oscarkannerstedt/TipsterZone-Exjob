import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/leaderboardServices";

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
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
        <ul>
          {leaderboard.map((user) => (
            <li key={user.rank}>
              #{user.rank} {user.username} - {user.total_points} poäng
            </li>
          ))}
        </ul>
      ) : (
        <p>Laddar Top Lista...</p>
      )}
    </div>
  );
};

export default Leaderboard;
