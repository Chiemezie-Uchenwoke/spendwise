import express from "express";
import { authRoute } from "./routers/authRouter.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRoute);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});