import express from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/add", createUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
