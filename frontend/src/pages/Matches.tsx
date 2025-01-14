import { useEffect, useState } from "react";
import { fetchMatchesByLeague } from "../services/matchService";

export const Matches = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [league, setLeague] = useState<string>("PL");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const fetchedMatches = await fetchMatchesByLeague(league);
        setMatches(fetchedMatches);
      } catch (error) {
        console.log("Error fetching matches", error);
      }
    };

    fetchMatches();
  }, [league]);

  return (
    <div>
      <h1>Kommande Matcher</h1>

      <div>
        <label htmlFor="league">Välj en liga</label>
        <select
          id="league"
          value={league}
          onChange={(e) => setLeague(e.target.value)}
        >
          <option value="PL">Premier League</option>
          <option value="FL1">Ligue 1</option>
          <option value="SA">Serie A</option>
          <option value="PD">La Liga</option>
        </select>
      </div>

      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <div>
              <span>
                {match.homeTeam.name} vs {match.awayTeam.name}
              </span>
              <span> - {match.utcDate}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;
