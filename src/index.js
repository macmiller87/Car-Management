import express from "express";
import cors from "cors";
import { errorMidlleware } from "./utils/errors/errorMiddleware.js";
import { carsRoutes } from "./routes/cars.routes.js";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(carsRoutes);

app.use(errorMidlleware);