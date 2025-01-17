import { useEffect, useState } from "react";
import { fetchMatchesByLeague } from "../services/matchService";
import { IMatch } from "../types/Match";
import { formatTime } from "../utils/formatTime";
import { createPrediciton } from "../services/predictionServices";

export const Matches = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [league, setLeague] = useState<string>("PL");
  const [motivationVisible, setMotivationVisible] = useState<boolean[]>([]);
  const [selectedOutcomes, setSelectedOutcomes] = useState<{
    [key: number]: string | null;
  }>({});
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const fetchedMatches = await fetchMatchesByLeague(league);
        console.log("Fetched Matches:", fetchedMatches);
        setMatches(fetchedMatches);
      } catch (error) {
        console.log("Error fetching matches", error);
      }
    };

    fetchMatches();
  }, [league]);

  useEffect(() => {
    setMotivationVisible(Array(matches.length).fill(false));
  }, [matches]);

  const toggleMotivation = (index: number) => {
    setMotivationVisible((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible))
    );
    console.log("Click on textarea button");
  };

  const handlePredictionSubmit = (matchId: number) => {
    const userId = localStorage.getItem("userId");

    console.log("userId", userId);

    if (!userId) {
      alert("Du måste logga in för att kunna lägga en tippning!");
      return;
    }

    const predictedOutcome = selectedOutcomes[matchId];

    if (!predictedOutcome) {
      alert("Vänligen välj ett resultat!");
      return;
    }

    const predicitonData = {
      user_id: userId,
      match_id: matchId,
      predicted_outcome: predictedOutcome,
      summary: summary,
      league: league,
    };

    console.log("match id:", matchId);

    createPrediciton(predicitonData)
      .then((response) => {
        alert("Prediction skapad!");
        console.log(response);

        setSelectedOutcomes((prev) => {
          const newSelectedOutcomes = { ...prev };
          delete newSelectedOutcomes[matchId];
          return newSelectedOutcomes;
        });

        setSummary("");
      })
      .catch((error) => {
        alert(error.message);
        console.log("error create predicition", error);
      });
  };

  const handleOutcomeClick = (matchId: number, outcome: string) => {
    setSelectedOutcomes((prev) => {
      return {
        ...prev,
        [matchId]: prev[matchId] === outcome ? null : outcome,
      };
    });
  };

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
              <div className="home-team">{match.homeTeam.shortName}</div>
              <p>-</p>
              <div className="away-team">{match.awayTeam.shortName}</div>
            </div>

            <div className="match-date">{formatTime(match.utcDate)}</div>

            <div className="prediction-options">
              <button
                onClick={() => handleOutcomeClick(match.id, "1")}
                className={selectedOutcomes[match.id] === "1" ? "selected" : ""}
              >
                1
              </button>
              <button
                onClick={() => handleOutcomeClick(match.id, "X")}
                className={selectedOutcomes[match.id] === "X" ? "selected" : ""}
              >
                X
              </button>
              <button
                onClick={() => handleOutcomeClick(match.id, "2")}
                className={selectedOutcomes[match.id] === "2" ? "selected" : ""}
              >
                2
              </button>
            </div>

            <div className="motivation">
              <button onClick={() => toggleMotivation(index)}>
                Vill du lägga till en motivering?
              </button>

              {motivationVisible[index] && (
                <textarea
                  className={`motivation-textarea ${
                    motivationVisible[index] ? "visible" : ""
                  }`}
                  placeholder="Skriv din motivering här..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                ></textarea>
              )}
            </div>

            <button
              className="submit-prediction"
              onClick={() => handlePredictionSubmit(match.id)}
            >
              Lägg tippning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
