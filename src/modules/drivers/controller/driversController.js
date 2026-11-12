import { Driver } from "../../../utils/datasValidation/driverDataValidation.js";   
import { AppError } from "../../../utils/errors/appError.js";
import { DriverService } from "../service /driverService.js";
import { Router } from "express";

export class DriversController {
    driversService;

    constructor() {
        this.driversService = new DriverService();
    }

    async createDriver() {
        const createDriver = Router();

        createDriver.post("/", async (request, response) => {

            const { driverName } = request.body;

            const checkDriverData = await Driver(driverName);

            if(checkDriverData === true) {
                const create = await this.driversService.createDriver(driverName);
                return response.status(201).json(create);
            }

            return response.status(checkDriverData.statusCode).json({ error: checkDriverData.message });
        });

        return createDriver;
    }

    async updateDriver() {
        const updateDriver = Router();

        updateDriver.put("/", async (request, response) => {

            const { driver_id } = request.query;
            const { driverName } = request.body;

            const findDriverById = await this.driversService.findDriverById(driver_id);

            if(!findDriverById) {
                return response.status(404).json(new AppError("Driver not found !", 404));
            }

            const checkDriverData = await Driver(driverName);

            if(checkDriverData === true) {
                const updateDriver = await this.driversService.updateDriver(driver_id, driverName);

                if(!updateDriver) {
                    return response.status(404).json(new AppError("Driver not found !", 404));
                }

                return response.status(200).json(updateDriver);
            }

            return response.status(checkDriverData.statusCode).json({ error: checkDriverData.message });
        });

        return updateDriver;
    }

    async deleteDriver() {
        const deleteDriver = Router();

        deleteDriver.delete("/", async (request, response) => {

            const { driver_id } = request.query;

            const findDriverById = await this.driversService.findDriverById(driver_id);

            if(!findDriverById) {
                return response.status(404).json(new AppError("Driver not found !", 404));
            }

            await this.driversService.deleteDriver(driver_id);
            return response.status(200).json({ message: "Driver deleted with success !" });
        });

        return deleteDriver;
    }

    async driverSearch() {
        const driverSearch = Router();

        driverSearch.get("/", async (request, response) => {

            const { driver_id } = request.query;

            const findDriverById = await this.driversService.findDriverById(driver_id);

            if(!findDriverById) {
                return response.status(404).json(new AppError("Driver not found !", 404));
            }

            const search = await this.driversService.driverSearch(driver_id);
            return response.status(200).json(search);
        });

        return driverSearch;
    }

    async driverSearchByName() {
        const driverSearchByName = Router();

        driverSearchByName.get("/", async (request, response) => {

            const { driver_name } = request.headers;

            const checkDriverData = await Driver(driver_name);

            if(checkDriverData === true) {
                const searchDriver = await this.driversService.driverSearchByName(driver_name);

                if(!searchDriver) {
                    return response.status(404).json({ message: "Driver not found !"});
                }

                return response.status(200).json(searchDriver);
            }

            return response.status(checkDriverData.statusCode).json({ error: checkDriverData.message });
        });

        return driverSearchByName;
    }

}