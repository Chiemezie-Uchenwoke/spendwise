import express from "express";
import { registerUser } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/register", registerUser);

export {authRoute};