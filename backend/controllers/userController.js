import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, total_points } = req.body;

    //Generate hashed password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
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
