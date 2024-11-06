import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Create new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password, total_points } = req.body;

    //Generate hashed password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      hashed_password: hashedPassword,
      total_points,
    });

    await newUser.save();

    res.status(200).json({
      message: "User created",
      user: newUser,
    });
  } catch (error) {
    console.error("Error while create new user: ", error);
    res.status(500).json({
      error: "Couldnt create user.",
    });
  }
};

// Get specific user with email
export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    if (await bcrypt.compare(req.body.password, user.hashed_password)) {
      return res.status(200).json(user.id);
    } else {
      res.status(401).send({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error while login", error);
    res.status(500).send({ message: "Server error" });
  }
};
