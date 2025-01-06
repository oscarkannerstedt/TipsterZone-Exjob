import axios from "axios";
import NodeCache from "node-cache";
import matchModel from "../models/matchModel.js";
import processUserPredictions from "./predictionController.js";

const API_BASE_URL = "https://api.football-data.org/v4/";

// cache updates every 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

// Fetch all matches from api
const fetchAllMatches = async (req, res) => {
  const { league } = req.query;
  const API_KEY = process.env.API_KEY;

  if (!league) {
    return res.status(400).json({ message: "No league found" });
  }

  const cacheKey = `matches_${league}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  const url = `${API_BASE_URL}competitions/${league}/matches`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    const upcomingMatches = response.data.matches.filter(
      (match) => match.status === "TIMED"
    );

    const responseData = { ...response.data, matches: upcomingMatches };

    cache.set(cacheKey, responseData);

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching from api: ", error);
    return res.status(500).json({ message: "Error while get data from api" });
  }
};

// Its works to get match with specifik id from api but after filter FINISHED it dont find it.
const fetchMatchResultFromApi = async (league) => {
  const API_KEY = process.env.API_KEY;
  const url = `${API_BASE_URL}competitions/${league}/matches`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    const finishedMatches = response.data.matches.filter(
      (match) => match.status === "FINISHED"
    );

    return finishedMatches;
  } catch (error) {
    console.error("Error fetching match results from API: ", error);
    return [];
  }
};

export const updateMatchResultsAndPredicitons = async () => {
  try {
    const leagues = ["PL", "FL1", "SA", "PD"];

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const league of leagues) {
      const finishedMatches = await fetchMatchResultFromApi(league);
      await delay(2000);

      for (const match of finishedMatches) {
        const dbMatch = await matchModel.findOne({ match_id: match.id });

        if (dbMatch) {
          console.log("Match found in database:", dbMatch);
          if (dbMatch.status !== "FINISHED" && match.status === "FINISHED") {
            console.log("Updating match with ID:", dbMatch.match_id);
            dbMatch.status = "FINISHED";
            dbMatch.result = {
              home: match.score.fullTime.home,
              away: match.score.fullTime.away,
            };

            await dbMatch.save();
            await processUserPredictions(dbMatch);
          } else {
            console.log(
              `Match ${match.id} has already been finished and updated`
            );
          }
        } else {
          console.log(`Match ${match.id} not found in database`);
        }
      }
    }
  } catch (error) {
    console.error("Error updating match results & predicitons", error);
  }
};

export default {
  fetchAllMatches,
  fetchMatchResultFromApi,
  updateMatchResultsAndPredicitons,
};
