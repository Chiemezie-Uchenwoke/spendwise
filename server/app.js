import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { authRouter } from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notfound.js";
import session from "express-session";
import transactionRouter from "./routes/transactionRoutes.js";

dotenv.config();

const dbUrl = process.env.SPENDWISE_DB_URL;
mongoose.connect(dbUrl).then(() => console.log("Database is running"));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,           // true = send cookie only over HTTPS
    httpOnly: true,          
    maxAge: 1000 * 60 * 30   // cookie expires in 30 minutes (in ms)
  }
}));

app.use("/auth", authRouter);
app.use("/transactions", transactionRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});