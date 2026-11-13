import { CarsRegistrationModel } from "../model/carsRegistrationModel.js";

export class CarsRegistrationService {
    carRegistrationModel;

    constructor() {
        this.carRegistrationModel = new CarsRegistrationModel();
    }

    async createCarRegistration(driverName, carName, carLicensePlate, reason_for_use) {
        const create = await this.carRegistrationModel.create(
            driverName,
            carName,
            carLicensePlate,
            reason_for_use
        );

        return create;
    }

    async checkDriverOnCarRegistration(driver_name) {
        const find = await this.carRegistrationModel.checkDriver(driver_name);
        return find;
    }

    async checkCarOnCarRegistration(carLicensePlate) {
        const find = await this.carRegistrationModel.checkCar(carLicensePlate);
        return find;
    }

    async finishCarRegistration(carRegistration_id, driverName) {
        const find = await this.carRegistrationModel.finishCarRegis(carRegistration_id, driverName);
        return find;
    }

    async findCarRegistrationById(carRegistration_id) {
        const find = await this.carRegistrationModel.findCarRegistration(carRegistration_id);
        return find;
    }

    async findAllCarsRegistration() {
        const search = await this.carRegistrationModel.searchAllCarsRegistration();
        return search;
    }

}