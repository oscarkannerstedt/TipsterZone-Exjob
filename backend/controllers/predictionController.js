import PredictionModel from "../models/predictionModel.js";
import MatchModel from "../models/matchModel.js";
import matchControllers from "./matchControllers.js";
import userModel from "../models/userModel.js";
import predictionModel from "../models/predictionModel.js";

//Create a prediction
export const createPrediction = async (req, res) => {
  try {
    const { user_id, match_id, predicted_outcome, summary } = req.body;
    const { league } = req.query;

    if (!league) {
      return res.status(400).json({ message: "League code is required" });
    }

    //Check if match is stored in database
    let match = await MatchModel.findOne({ match_id });

    //If match not found in database, get it from API & save it
    if (!match) {
      const apiRequest = { query: { league } };
      const apiResponse = {
        status: () => ({
          json: (data) => data,
        }),
      };

      const data = await matchControllers.fetchAllMatches(
        apiRequest,
        apiResponse
      );

      if (!data || !data.matches) {
        return res.status(400).json({ message: "Matches not found from api" });
      }

      const foundMatch = data.matches.find((m) => m.id === parseInt(match_id));

      if (!foundMatch) {
        return res
          .status(400)
          .json({ message: "Match not found in API response" });
      }

      //Save match in database
      match = new MatchModel({
        match_id: foundMatch.id,
        team_home: foundMatch.homeTeam.shortName,
        team_away: foundMatch.awayTeam.shortName,
        match_date: foundMatch.utcDate,
        status: foundMatch.status,
        result: foundMatch.status,
        competition: foundMatch.competition.name,
      });

      await match.save();
      console.log("Match saved to database: ", match);
    }

    //Check if user already placed a prediciton for this match
    const existingPrediction = await predictionModel.findOne({
      user_id: user_id,
      match_id: match_id,
    });

    if (existingPrediction) {
      return res.status(400).json({
        message: "Du har redan lagt en tippning på denna matchen.",
      });
    }

    //Create a new prediciton
    const prediction = new PredictionModel({
      user_id,
      match_id,
      predicted_outcome,
      summary,
    });

    await prediction.save();
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

//Get all predictions from specifik user by userId
export const getPredictionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const predictions = await PredictionModel.find({ user_id: userId });

    if (!predictions || predictions.length === 0) {
      return res
        .status(404)
        .json({ message: "No predictions found for this user" });
    }

    res.json(predictions);
  } catch (error) {
    console.error("Error while get all predictions by userId", error);
    res.status(500).json({ message: "Failed to fetch predictions" });
  }
};

// Update user predicitons when match is finished
const processUserPredictions = async (dbMatch) => {
  try {
    const predictions = await PredictionModel.find({
      match_id: dbMatch.match_id,
      processed: false,
    });

    if (predictions.length === 0) {
      console.log(`No predictions found for match ${dbMatch.match_id}`);
    }
    const homeScore = dbMatch.result.home;
    const awayScore = dbMatch.result.away;
    let actualOutcome;

    if (homeScore > awayScore) {
      actualOutcome = "1";
    } else if (homeScore < awayScore) {
      actualOutcome = "2";
    } else {
      actualOutcome = "X";
    }

    for (const prediction of predictions) {
      let points = 0;

      if (prediction.predicted_outcome === actualOutcome) {
        points = 3;
      } else {
        points = -1;
      }

      prediction.points_awarded = points;
      prediction.processed = true;
      await prediction.save();

      const user = await userModel.findById(prediction.user_id);
      if (user) {
        user.total_points += points;
        await user.save();
      } else {
        console.log(`User not found for prediction ${prediction._id}`);
      }
    }
  } catch (error) {
    console.error("Error processing user predicitons", error);
  }
};

export default processUserPredictions;
