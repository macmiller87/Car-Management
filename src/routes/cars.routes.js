import { CarsController } from "../modules/cars/controller/carsController.js";
import { Router } from "express";

export const carsRoutes = Router();
const carsController = new CarsController();

carsRoutes.use("/createCar", await carsController.createCar());
carsRoutes.use("/updateCar/:car_id", await carsController.updateCar());
carsRoutes.use("/deleteCar/:car_id", await carsController.deleteCar());
carsRoutes.use("/searchCar/", await carsController.carSearch());
carsRoutes.use("/searchAllCars", await carsController.searchAllCars());