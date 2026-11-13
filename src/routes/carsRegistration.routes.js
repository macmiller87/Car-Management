import { CarsRegistrationController } from "../modules/carsRegistrations/controller/carsRegistrationController.js";
import { Router } from "express";

export const carsRegistrationRoutes = Router();
const carsRegistrationController = new CarsRegistrationController();

carsRegistrationRoutes.use("/createCarRegistration", await carsRegistrationController.createCarRegistration());
carsRegistrationRoutes.use("/finishCarRegistration/:carRegistration_id", await carsRegistrationController.finishCarRegistration());
carsRegistrationRoutes.use("/searchAllCarsRegistration", await carsRegistrationController.searchAllCarsRegistration());