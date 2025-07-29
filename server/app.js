import express from "express";
import env from "dotenv";
import { authRoute } from "./routers/authRouter.js";

env.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRoute);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});