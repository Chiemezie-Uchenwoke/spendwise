import express from "express";
import { registerUser } from "../controllers/registerController.js";

const authRoute = express.Router();

authRoute.post("/register", registerUser);

export {authRoute};