import { CarsRegistration } from "../../../utils/datasValidation/carsRegistrationDataValidation.js";
import { CarsRegistrationService } from "../service/carsRegistrationService.js";
import { DriverService } from "../../drivers/service /driverService.js";
import { CarsService } from "../../cars/service/carsService.js";
import { AppError } from "../../../utils/errors/appError.js";
import { Router } from "express";

export class CarsRegistrationController {
    carsRegistrationService;
    driversService;
    carsService;

    constructor() {
        this.driversService = new DriverService();
        this.carsService = new CarsService();
        this.carsRegistrationService = new CarsRegistrationService();
    }

    async createCarRegistration() {
        const carsRegistrationController = Router();

        carsRegistrationController.post("/", async (request, response) => {

            const { driverName, carName, reason_for_use } = request.body;

            const checkCarRegistrationDatas = await CarsRegistration(driverName, carName, reason_for_use);

            if(checkCarRegistrationDatas === true) {
                const findDriverByName = await this.driversService.driverSearchByName(driverName);

                if(!findDriverByName) {
                    return response.status(404).json(new AppError("Driver not found !", 404));
                }

                const findCarByName = await this.carsService.findCarByName(carName);

                if(!findCarByName) {
                    return response.status(404).json(new AppError("Car not found !", 404));
                }

                if(findDriverByName && findCarByName) {
                    const checkDriverOnCarRegistration = await this.carsRegistrationService.checkDriverOnCarRegistration(findDriverByName.name);

                    if(checkDriverOnCarRegistration === null) {
                        return response.status(401).json(new AppError("Driver already have a car reservation !", 401));
                    }

                    const checkCarOnCarRegistration = await this.carsRegistrationService.checkCarOnCarRegistration(findCarByName.carLicensePlate);

                    if(checkCarOnCarRegistration === null) {
                        return response.status(401).json(new AppError("Car is already in a reservation !", 401));
                    }

                    const create = await this.carsRegistrationService.createCarRegistration(
                        driverName,
                        carName,
                        findCarByName.carLicensePlate,
                        reason_for_use
                    );

                    return response.status(201).json({
                        id: create.id,
                        start_date: create.start_date,
                        driver_name: create.driver_name,
                        car_name: create.car_name,
                        carLicensePlate: create.carLicensePlate,
                        reason_for_use: create.reason_for_use,
                        createdAt: create.createdAt
                    });
                }

            }

            return response.status(checkCarRegistrationDatas.statusCode).json({ error: checkCarRegistrationDatas.message });
        });

        return carsRegistrationController;
    }

    async finishCarRegistration() {
        const finishCarRegistration = Router();

        finishCarRegistration.post("/", async (request, response) => {

            const { carRegistration_id } = request.query;
            const { driverName } = request.body;

            if(driverName === "" || typeof(driverName) !== "string") {
                return response.status(401).json(new AppError("DriverName must have a value OR, must have a string as a vvalue !", 401));
            }

            const findCarRegistrationById = await this.carsRegistrationService.findCarRegistrationById(carRegistration_id);

            if(findCarRegistrationById) {
                const findDriverByName = await this.driversService.driverSearchByName(driverName);

                if(!findDriverByName) {
                    return response.status(404).json(new AppError("Driver not found !", 404));
                }

                const checkDriverName = driverName === findCarRegistrationById.driver_name ? true : false;

                if(checkDriverName === true) {
                    const finishCarRegistration = await this.carsRegistrationService.finishCarRegistration(carRegistration_id, driverName);

                    return response.status(201).json({
                        id: finishCarRegistration.id,
                        start_date: finishCarRegistration.start_date,
                        end_date: finishCarRegistration.end_date,
                        driver_name: finishCarRegistration.driver_name,
                        car_name: finishCarRegistration.car_name,
                        carLicensePlate: finishCarRegistration.carLicensePlate,
                        reason_for_use: finishCarRegistration.reason_for_use,
                        createdAt: finishCarRegistration.createdAt
                    });
                }

                return response.status(404).json({ error: "Driver name must be the Owner of that CarRegistration !" });
            } 

            return response.status(404).json({ error: "Car registration not found !" });

        });

        return finishCarRegistration;
    }

    async searchAllCarsRegistration() {
        const searchAllCarsRegistration = Router();

        searchAllCarsRegistration.get("/", async (request, response) => {
            const search = await this.carsRegistrationService.findAllCarsRegistration();
            return response.status(200).json(search);
        });

        return searchAllCarsRegistration;
    }

}