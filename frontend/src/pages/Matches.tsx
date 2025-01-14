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
        <div className="">
          <div className="league-menu-pl" onClick={() => setLeague("PL")}>
            <img src="" alt="England" />
            <div>England</div>
          </div>

          <div className="league-menu-fl1" onClick={() => setLeague("FL1")}>
            <img src="" alt="Frankrike" />
            <div>Frankrike</div>
          </div>

          <div className="league-menu-sa" onClick={() => setLeague("SA")}>
            <img src="" alt="Italien" />
            <div>Italien</div>
          </div>

          <div className="league-menu-pl" onClick={() => setLeague("PD")}>
            <img src="" alt="Spanien" />
            <div>Spanien</div>
          </div>
        </div>
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
