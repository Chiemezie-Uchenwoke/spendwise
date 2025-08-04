import express from "express";
import { addTransaction } from "../controllers/transactionController.js";
import { authenticateUser } from "../middlewares/authenticateJwt.js";

const transactionRouter = express.Router();

transactionRouter.post("/", authenticateUser, addTransaction);

export default transactionRouter;