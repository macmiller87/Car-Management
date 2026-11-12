import { DriverModel } from "../model/driverModel.js";

export class DriverService {
    driverModel;

    constructor() {
        this.driverModel = new DriverModel();
    }

    async createDriver(driverName) {
        const create = await this.driverModel.create(driverName);
        return create;
    }

    async updateDriver(driver_id, driverName) {
        const update = await this.driverModel.updateDriver(driver_id, driverName);
        return update;
    }
    
    async deleteDriver(driver_id) {
        await this.driverModel.deleteDriver(driver_id);;
    }

    async driverSearch(driver_id) {
        const search = await this.driverModel.driverSearch(driver_id);
        return search;
    }

    async driverSearchByName(driver_name) {
        const search = await this.driverModel.driverSearchByName(driver_name);
        return search;
    }
    
    async findDriverById(driver_id) {
        const find = await this.driverModel.findDriverById(driver_id);
        return find;
    }
    
}