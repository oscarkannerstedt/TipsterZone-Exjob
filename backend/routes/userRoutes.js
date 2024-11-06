import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/add", createUser);
router.post("/login", loginUser);

export default router;
