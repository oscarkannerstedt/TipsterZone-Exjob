import express from "express";
import {
  createUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/add", createUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

export default router;
