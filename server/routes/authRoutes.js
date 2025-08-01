import express from "express";
import { registerUser } from "../controllers/registerController.js";
import { logInUser } from "../controllers/loginController.js";

const authRoute = express.Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", logInUser);

export {authRoute};