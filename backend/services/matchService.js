import axios from "axios";

const API_BASE_URL = "https://v3.football.api-sports.io";
const SEASON = "2024";

const LEAGUE_ID = {
  premierLeague: 39,
  serieA: 135,
  laLiga: 140,
  bundesliga: 78,
  ligue1: 61,
};

export const fetchAllMatches = async () => {
  try {
    const promises = Object.values(LEAGUE_ID).map((id) =>
      axios.get(`${API_BASE_URL}/fixtures`, {
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
        params: {
          league: id,
          season: SEASON,
        },
      })
    );

    const response = await Promise.all(promises);
    return response.flatMap((response) => response.data.response);
  } catch (error) {
    console.error("Error fetching matches: ", error);
    throw error;
  }
};
