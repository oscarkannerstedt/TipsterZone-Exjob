import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Create new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const total_points = 0;

    //Control to see if username already exist.
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Användarnamnet är upptaget." });
    }

    //Control to see if email already exist.
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "Användare med denna E-post finns redan." });
    }

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

// Login with user
export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    if (await bcrypt.compare(req.body.password, user.hashed_password)) {
      return res.status(200).json({
        userId: user.id,
        email: user.email,
        username: user.username,
        total_points: user.total_points,
      });
    } else {
      res.status(401).send({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error while login", error);
    res.status(500).send({ message: "Server error" });
  }
};

//Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User was deleted successfully" });
  } catch (error) {
    console.error("Error while deleting user", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Update user information
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    const updateData = { username, email };

    if (password) {
      updateData.hashed_password = await bcrypt.hash(password, 10);
    }

    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error while updating user", error);
    res.status(500).json({ message: "Server error" });
  }
};
