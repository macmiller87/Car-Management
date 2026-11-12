import { PrismaService } from "../../../prismaORM/prismaService.js";

export class DriverModel {
    prismaService;

    constructor() {
        this.prismaService = new PrismaService();
    }

    async create(driverName) {
        const create = await this.prismaService.drivers.create({
            data: {
                name: driverName
            }
        });

        return create;
    }

    async updateDriver(driver_id, driverName) {
        const update = await this.prismaService.drivers.update({
            where: {
                id: driver_id
            },
            data: {
                name: driverName
            }
        });

        return update;
    }

    async deleteDriver(driver_id) {
        await this.prismaService.drivers.delete({
            where: {
                id: driver_id
            }
        });
    }

    async driverSearch(driver_id) {
        const find = await this.prismaService.drivers.findFirst({
            where: {
                id: driver_id
            }
        });

        return find;
    }

    async driverSearchByName(driver_name) {
        const find = await this.prismaService.drivers.findFirst({
            where: {
                name: driver_name
            }
        });

        return find;
    }

    async findDriverById(driver_id) {
        const find = await this.prismaService.drivers.findFirst({
            where: {
                id: driver_id
            }
        });

        return find;
    }

}