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
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const dbUrl = process.env.SPENDWISE_DB_URL;
mongoose.connect(dbUrl).then(() => console.log("Database is running"));

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // secure only in prod (HTTPS)
    httpOnly: true,
    // sameSite: process.env.NODE_ENV === "none", 
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));
app.use(cookieParser()); 


app.use("/auth", authRouter);
app.use("/transactions", transactionRouter);
app.use("/profile", profileRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});