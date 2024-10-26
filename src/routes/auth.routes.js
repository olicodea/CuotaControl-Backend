import { register, login } from "../controllers/AuthController.js";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);