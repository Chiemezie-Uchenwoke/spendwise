import express from "express";
import { addTransaction, fetchAllTransactions } from "../controllers/transactionController.js";
import { authenticateUser } from "../middlewares/authenticateJwt.js";

const transactionRouter = express.Router();

transactionRouter.post("/", authenticateUser, addTransaction);
transactionRouter.get("/", authenticateUser, fetchAllTransactions);

export default transactionRouter;