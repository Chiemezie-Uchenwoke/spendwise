import express from "express";
import { registerUser } from "../controllers/registerController.js";
import { logInUser } from "../controllers/loginController.js";
import { handleRefreshToken } from "../middlewares/refreshToken.js";
import { logOutUser } from "../controllers/logOutController.js";
import { authenticateUser } from "../middlewares/authenticateJwt.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", logInUser);
authRouter.get("/refresh", handleRefreshToken);
authRouter.post("/logout", authenticateUser, logOutUser);

export {authRouter};