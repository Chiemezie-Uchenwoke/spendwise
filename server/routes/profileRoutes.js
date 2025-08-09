import express from "express";
import { uploadProfileImage, getUserProfileImage } from "../controllers/profileController";
import upload from "../middlewares/uploadProfile";
import { authenticateUser } from "../middlewares/authenticateJwt";

const profileRouter = express.Router();

profileRouter.post("/upload", authenticateUser, upload.single("profileImage"), uploadProfileImage);
profileRouter.get("/me", authenticateUser, getUserProfileImage);

export default profileRouter;