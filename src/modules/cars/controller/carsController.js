import { Cars, SearchAllCarsByfields } from "../../../utils/datasValidation/carsDataValidation.js";
import { AppError } from "../../../utils/errors/appError.js";
import { CarsService } from "../service/carsService.js";   
import { Router } from "express";

export class CarsController {
    carsService;

    constructor() {
        this.carsService = new CarsService();
    }

    async createCar() {
        const createCar = Router();

        createCar.post("/", async (request, response) => {

            const { carName, carLicensePlate, color, brand } = request.body;

            const checkCarDatas = await Cars(carName, carLicensePlate, color, brand);

            if(checkCarDatas === true) {
                const ckeckCarLicensePlate = await this.carsService.ckeckCarLicensePlate(carLicensePlate);
                
                if(!ckeckCarLicensePlate) {
                    const create = await this.carsService.createcar({
                        carName,
                        carLicensePlate,
                        color,
                        brand
                    });
                    
                    return response.status(201).json(create);
                }

                return response.status(401).json(new AppError("CarlicensePlate is already in use !", 401));
            }

            return response.status(checkCarDatas.statusCode).json({ error: checkCarDatas.message });
        });

        return createCar;
    }

    async updateCar() {
        const updateCar = Router();

        updateCar.patch("/", async (request, response) => {

            const { car_id } = request.query;
            const { carName, color } = request.body;

            const findCarById = await this.carsService.findCarById(car_id);

            if(!findCarById) {
                return response.status(404).json(new AppError("Car not found !", 404));
            }

            const carLicensePlate = findCarById.carLicensePlate;
            const brand = findCarById.brand;

            const checkCarDatas = await Cars(carName, carLicensePlate, color, brand);

            if(checkCarDatas === true) {
                const update = await this.carsService.updateCar(car_id, carName, color);
                return response.status(200).json(update);
            }

            return response.status(checkCarDatas.statusCode).json({ error: checkCarDatas.message });
        });

        return updateCar;
    }

    async deleteCar() {
        const deleteCar = Router();

        deleteCar.delete("/", async (request, response) => {

            const { car_id } = request.query;

            const find = await this.carsService.findCarById(car_id);

            if(!find) {
                return response.status(404).json(new AppError("Car not found !", 404));
            }

            await this.carsService.deleteCar(car_id);
            return response.status(200).json({ message: "Car deleted with sucess !" });
        });

        return deleteCar;
    }

    async carSearch() {
        const carSearch = Router();

        carSearch.get("/", async (request, response) => {

            const { car_id } = request.headers;

            const findCarById = await this.carsService.findCarById(car_id);

            if(!findCarById) {
                return response.status(404).json(new AppError("Car not found !", 404));
            }

            const search = await this.carsService.carSearch(car_id);
            return response.status(200).json(search);
        });

        return carSearch;
    }

    async searchAllCars() {
        const searchAllCars = Router();

        searchAllCars.get("/", async (request, response) => {

            const { color, brand } = request.body;

            if(color !== "" && brand !== "") {
                const checkCarDatas = await SearchAllCarsByfields(color, brand);

                if(checkCarDatas) {
                    const search = await this.carsService.searchAllCars(color, brand);
                    return response.status(200).json(search);
                }

            }else if(color !== "" && brand === "") {

                if(typeof(color) !== "string") {
                    return response.status(401).json(new AppError("Color must be a string as a value !", 401));
                }

                const search = await this.carsService.searchCarsByColor(color);

                if(search.length === 0) {
                    return response.status(404).json(new AppError("There isn't any car with that color, OR color not found !", 404));
                }

                return response.status(200).json(search);

            }else if(color === "" && brand !== "") {

                if(typeof(brand) !== "string") {
                    return response.status(401).json(new AppError("Brand must be a string as a value !", 404));
                }

                const search = await this.carsService.searchCarsByBrand(brand);

                if(search.length === 0) {
                    return response.status(404).json(new AppError("There isn't any car with that brand, OR color not brand !", 404));
                }

                return response.status(200).json(search);

            }else {
                return response.status(401).json(new AppError("At least one field must have a valid value !", 401));
            }

        });

        return searchAllCars;
    }

}