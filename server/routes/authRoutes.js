import express from "express";
import { registerUser } from "../controllers/registerController.js";
import { logInUser } from "../controllers/loginController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", logInUser);

export {authRouter};