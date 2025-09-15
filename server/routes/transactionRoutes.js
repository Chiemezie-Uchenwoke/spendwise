import express from "express";
import { addTransaction, fetchAllTransactions, editTransaction, deleteTransaction, getSingleTransaction } from "../controllers/transactionController.js";
import { filterTransactions } from "../controllers/filterTransactionController.js";
import { authenticateUser } from "../middlewares/authenticateJwt.js";

const transactionRouter = express.Router();

transactionRouter.post("/", authenticateUser, addTransaction);
transactionRouter.get("/", authenticateUser, fetchAllTransactions);
transactionRouter.get("/filter", authenticateUser, filterTransactions);
transactionRouter.get("/:transactionId", authenticateUser, getSingleTransaction);
transactionRouter.put("/:transactionId", authenticateUser, editTransaction);
transactionRouter.delete("/:transactionId", authenticateUser, deleteTransaction);

export default transactionRouter;