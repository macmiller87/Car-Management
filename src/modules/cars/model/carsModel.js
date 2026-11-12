import { PrismaService } from "../../../prismaORM/prismaService.js";

export class CarsModel {
    prismaService;

    constructor() {
        this.prismaService = new PrismaService();
    }

    async create(data) {
        const create = await this.prismaService.cars.create({
            data: data
        });

        return create;
    }

    async update(car_id, carName, color) {
        const update = await this.prismaService.cars.update({
            where: {
                id: car_id
            },
            data: {
                carName: carName,
                color: color
            }
        });

        return update;
    }

    async delete(car_id) {
        await this.prismaService.cars.delete({
            where: {
                id: car_id
            }
        });
    }

    async search(car_id) {
        const find = await this.prismaService.cars.findFirst({
            where: {
                id: car_id
            }
        });

        return find;
    }

    async searchAll(color, brand) {
        const find = await this.prismaService.cars.findMany({
            where: {
                AND: [{
                  OR: [
                    { color: color },
                    { brand: brand }
                  ]  
                }
                ],
                OR: [
                    { color: color },
                    { brand: brand }
                ]

            }
        });

        return find;
    }

    async findCarsByColor(color) {
        const find = await this.prismaService.cars.findMany({
            where: {
                color: color
            }
        });

        return find;
    }

    async findCarsByBrand(brand) {
        const find = await this.prismaService.cars.findMany({
            where: {
                brand: brand
            }
        });

        return find;
    }

    async findCarById(car_id) {
        const find = await this.prismaService.cars.findFirst({
            where: {
                id: car_id
            }
        });

        return find;
    }

}