import PredictionModel from "../models/predictionModel.js";
import MatchModel from "../models/matchModel.js";

const fetchMatchFromAPI = async (match_id) => {
  // Mockfunktion för att simulera API-hämtning av match
  const mockMatchData = {
    match_id: "1234567890abcdef",
    team_home: "Team A",
    team_away: "Team B",
    match_date: new Date(),
    status: "Scheduled",
    result: "TBD",
    competition: "Premier League",
  };

  return mockMatchData;
};

//Create a prediction
export const createPrediction = async (req, res) => {
  try {
    const { user_id, match_id, predicted_outcome, summary } = req.body;

    //Check if match is stored in database
    let match = await MatchModel.findOne({ match_id });

    //If match not found in database, get it from API & save it
    if (!match) {
      // Create a function that get match from API
      match = await fetchMatchFromAPI(match_id);
      console.log("Fetched match from API: ", match);

      if (!match) {
        return res.status(404).json({ message: "Match not found from API" });
      }

      //Save match in database
      match = new MatchModel({
        match_id: match.match_id,
        team_home: match.team_home,
        team_away: match.team_away,
        match_date: match.match_date,
        status: match.status,
        result: match.result,
        competition: match.competition,
      });

      await match.save();
      console.log("Match saved to database: ", match);
    }

    const prediction = new PredictionModel({
      user_id,
      match_id,
      predicted_outcome,
      summary,
    });

    await prediction.save();
    console.log("Prediction saved to database: ", prediction);
    res.status(200).json(prediction);
  } catch (error) {
    console.error("Error while creating prediction", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Update existing prediction
export const updatePrediction = async (req, res) => {
  try {
    const { predictionId } = req.params;
    const updatedData = req.body;

    const updatedPrediction = await PredictionModel.findByIdAndUpdate(
      predictionId,
      updatedData,
      { new: true }
    );

    if (!updatedPrediction) {
      return res.statu(404).json({ message: "Prediction not found" });
    }

    res.json(updatedPrediction);
  } catch (error) {
    console.error("Error while update prediction");
    res.status(500).json({ message: "Failed to update prediction" });
  }
};

//Delete a prediction by ID
export const deletePrediction = async (req, res) => {
  try {
    const { predictionId } = req.params;

    const deletedPrediction = await PredictionModel.findByIdAndDelete(
      predictionId
    );

    if (!deletedPrediction) {
      res.status(404).json({ message: "Prediction not found" });
    }

    res.status(200).json({ message: "Prediction deleted succesffully" });
  } catch (error) {
    console.error("Error while deleting prediction");
    res.status(500).json({ message: "Failed to delete prediction" });
  }
};
