import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { authRouter } from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notfound.js";
import session from "express-session";
import transactionRouter from "./routes/transactionRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const dbUrl = process.env.SPENDWISE_DB_URL;
mongoose.connect(dbUrl).then(() => console.log("Database is running"));

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,           // true = send cookie only over HTTPS
    httpOnly: true,          
    maxAge: 1000 * 60 * 60 * 24 * 7   // cookie expires in 7 days (in ms)
  }
}));

app.use("/auth", authRouter);
app.use("/transactions", transactionRouter);
app.use("/profile", profileRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});