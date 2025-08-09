import express from "express";
import { uploadProfileImage, getUserProfileImage } from "../controllers/profileController.js";
import upload from "../middlewares/uploadProfile.js";
import { authenticateUser } from "../middlewares/authenticateJwt.js";

const profileRouter = express.Router();

profileRouter.post("/upload", authenticateUser, upload.single("profileImage"), uploadProfileImage);
profileRouter.get("/me", authenticateUser, getUserProfileImage);

export default profileRouter;