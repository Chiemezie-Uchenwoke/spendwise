import express from "express";
import { addTransaction, fetchAllTransactions, editTransaction, deleteTransaction } from "../controllers/transactionController.js";
import { authenticateUser } from "../middlewares/authenticateJwt.js";

const transactionRouter = express.Router();

transactionRouter.post("/", authenticateUser, addTransaction);
transactionRouter.get("/", authenticateUser, fetchAllTransactions);
transactionRouter.put("/:transactionId", authenticateUser, editTransaction);
transactionRouter.delete("/:transactionId", authenticateUser, deleteTransaction);

export default transactionRouter;