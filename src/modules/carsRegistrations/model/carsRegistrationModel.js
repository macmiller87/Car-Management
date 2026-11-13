import { PrismaService } from "../../../prismaORM/prismaService.js";

export class CarsRegistrationModel {
    prismaService;

    constructor() {
        this.prismaService = new PrismaService();
    }

    async create(driverName, carName, carLicensePlate, reason_for_use) {
        const create = await this.prismaService.cars_Registrations.create({
            data: {
                driver_name: driverName,
                car_name: carName,
                carLicensePlate: carLicensePlate,
                reason_for_use: reason_for_use
            }
        });

        return create;
    }

    async finishCarRegis(carRegistration_id, driverName) {
        const findAndFinish = await this.prismaService.cars_Registrations.update({
            where: {
                id: carRegistration_id,
                AND: [
                    { driver_name: driverName }
                ]
            },
            data: {
                end_date: new Date().toISOString()
            }
        });

        return findAndFinish;
    }

    async searchAllCarsRegistration() {
        const search = await this.prismaService.cars_Registrations.findMany();
        return search;
    }

    async checkDriver(driver_name) {
        const search = await this.prismaService.cars_Registrations.findFirst({
            where: {
                driver_name: driver_name,
                end_date: null
            }
        });

        return search?.end_date;
    }

    async checkCar(carLicensePlate) {
        const search = await this.prismaService.cars_Registrations.findFirst({
            where: {
                carLicensePlate: carLicensePlate,
                end_date: null
            }
        });

        return search?.end_date;
    }

    async findCarRegistration(carRegistration_id) {
        const find = await this.prismaService.cars_Registrations.findFirst({
            where: {
                id: carRegistration_id
            }
        });

        return find;
    }

}