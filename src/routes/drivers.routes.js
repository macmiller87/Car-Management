import { DriversController } from "../modules/drivers/controller/driversController.js";
import { Router } from "express";

export const driversRoutes = Router();
const driversController = new DriversController();

driversRoutes.use("/createDriver", await driversController.createDriver());
driversRoutes.use("/updateDriver/:driver_id", await driversController.updateDriver());
driversRoutes.use("/deleteDriver/:driver_id", await driversController.deleteDriver());
driversRoutes.use("/searchDriver/:driver_id", await driversController.driverSearch());
driversRoutes.use("/driverSearchByName/", await driversController.driverSearchByName());