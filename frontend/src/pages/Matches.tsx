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
    <div className="matches-wrapper">
      <h1>Kommande Matcher</h1>

      <div className="league-menu-wrapper">
        <div
          className=" league-menu league-menu-pl"
          onClick={() => setLeague("PL")}
        >
          <img src="/images/england_round_icon_64.png" alt="England" />
          <div>England</div>
        </div>

        <div
          className="league-menu league-menu-fl1"
          onClick={() => setLeague("FL1")}
        >
          <img src="/images/france_round_icon_64.png" alt="Frankrike" />
          <div>Frankrike</div>
        </div>

        <div
          className=" league-menu league-menu-sa"
          onClick={() => setLeague("SA")}
        >
          <img src="/images/italy_round_icon_64.png" alt="Italien" />
          <div>Italien</div>
        </div>

        <div
          className="league-menu league-menu-pd"
          onClick={() => setLeague("PD")}
        >
          <img src="/images/spain_round_icon_64.png" alt="Spanien" />
          <div>Spanien</div>
        </div>
      </div>

      <div className="match-cards">
        {matches.map((match, index) => (
          <div key={index} className="match-card">
            <div className="teams">
              <div className="home-team">{match.homeTeam.name}</div>
              <p>-</p>
              <div className="away-team">{match.awayTeam.name}</div>
            </div>

            <div className="prediction-options">
              <button>1</button>
              <button>X</button>
              <button>2</button>
            </div>

            <div className="motivation">
              <button>Vill du lägga till en motivering?</button>
            </div>

            <button className="submit-prediction">Lägg tippning</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
