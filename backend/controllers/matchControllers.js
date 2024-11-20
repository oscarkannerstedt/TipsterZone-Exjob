import axios from "axios";
import NodeCache from "node-cache";

const API_BASE_URL = "https://api.football-data.org/v4/";

// cache updates every 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

const fetchAllMatches = async (req, res) => {
  const { league } = req.query;
  const API_KEY = process.env.API_KEY;

  if (!league) {
    return res.status(400).json({ message: "No league found" });
  }

  const cacheKey = `matches_${league}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Serving from cache");
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

export default fetchAllMatches;
