import express from "express";
import mongoose from 'mongoose';
import env from "dotenv";
import { authRoute } from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notfound.js";

env.config();

const dbUrl = process.env.SPENDWISE_DB_URL;
mongoose.connect(dbUrl).then(() => console.log("Database is running"));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/auth", authRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});