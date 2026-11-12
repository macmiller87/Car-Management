import { CarsModel } from "../model/carsModel.js";

export class CarsService {
    carsModel;

    constructor() {
        this.carsModel = new CarsModel();
    }

    async createcar(datas) {
        const create = await this.carsModel.create(datas);
        return create;
    }

    async updateCar(car_id, carName, color) {
        const update = await this.carsModel.update(car_id, carName, color);
        return update;
    }

    async deleteCar(car_id) {
        await this.carsModel.delete(car_id);
    }

    async carSearch(car_id) {
        const search = await this.carsModel.search(car_id);
        return search;
    }

    async searchAllCars(color, brand) {
        const search = await this.carsModel.searchAll(color, brand);
        return search;
    }

    async searchCarsByColor(color) {
        const search = await this.carsModel.findCarsByColor(color);
        return search;
    }

    async searchCarsByBrand(brand) {
        const search = await this.carsModel.findCarsByBrand(brand);
        return search;
    }

    async findCarById(car_id) {
        const find = await this.carsModel.findCarById(car_id);
        return find;
    }


}