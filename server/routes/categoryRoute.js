import express from "express";
import { authenticateUser } from "../middlewares/authenticateJwt.js";
import fetchCategories from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", authenticateUser, fetchCategories);

export {categoryRouter};