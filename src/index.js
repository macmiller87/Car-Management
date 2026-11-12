import express from "express";
import cors from "cors";
import { errorMidlleware } from "./utils/errors/errorMiddleware.js";
import { driversRoutes } from "./routes/drivers.routes.js"; 
import { carsRoutes } from "./routes/cars.routes.js";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(carsRoutes);
app.use(driversRoutes);

app.use(errorMidlleware);