import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { PrismaService } from "../../../prismaORM/prismaService.js";
import { app } from "../../../index.js";
import request from "supertest";

const prismaService = new PrismaService();

describe("Cars Registrations Controller Tests, 'createCarRegistration'", () => {

    beforeAll(async () => {
        await prismaService.cars_Registrations.deleteMany();
    });

    afterAll(async () => {
        await prismaService.cars_Registrations.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to create a 'Car Registration'", async () => {
        
        const driver = await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        const car = await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: driver.body.name,
            carName: car.body.carName,
            reason_for_use: "I'll going to make uber this week !"
        });

        expect(create.body).toHaveProperty("id");
        expect(create.body).toHaveProperty("start_date");
        expect(create.body.driver_name).toBe("Chaves");
        expect(create.body.car_name).toBe("Jetta");
        expect(create.body).toHaveProperty("carLicensePlate");
        expect(create.body.reason_for_use).toBe("I'll going to make uber this week !");
        expect(create.body).toHaveProperty("createdAt");
        expect(create.status).toBe(201);
    });

    it("Should not be able to create a 'Car Registration', if any 'parameter' are 'empty'", async () => {
        
        await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        const car = await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: "",
            carName: car.body.carName,
            reason_for_use: "I'll going to make uber this week !"
        });

        expect(create.body).toStrictEqual({ error: "All data must have a value !" });
        expect(create.status).toBe(401);
    });

    it("Should not be able to create a 'Car Registration', if any 'parameter' are 'wrongly defined'", async () => {
        
        const driver = await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: driver.body.name,
            carName: 7676,
            reason_for_use: "I'll going to make uber this week !"
        });

        expect(create.body).toStrictEqual({ error: "All datas must be a string as a value !" });
        expect(create.status).toBe(401);
    });

    it("Should not be able to create a 'Car Registration', if 'driver_name' are not found'", async () => {
        
        await request(app).post("/createDriver").send({
            driverName: "Godofredo"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Seu Barriga",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        expect(create.body).toStrictEqual({ message: "Driver not found !", statusCode: 404});
        expect(create.status).toBe(404);
    });

    it("Should not be able to create a 'Car Registration', if 'car_name' are not found'", async () => {
        
        await request(app).post("/createDriver").send({
            driverName: "Godofredo"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Godofredo",
            carName: "Golf",
            reason_for_use: "I'll going to make uber this week !"
        });

        expect(create.body).toStrictEqual({ message: "Car not found !", statusCode: 404});
        expect(create.status).toBe(404);
    });

    it("Should not be able to create a 'Car Registration', if 'Driver' already have a 'opened resevation'", async () => {
        
        await request(app).post("/createDriver").send({
            driverName: "Godofredo"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });

        await request(app).post("/createCarRegistration").send({
            driverName: "Godofredo",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        await request(app).post("/createCar").send({
            carName: "Audi A4",
            carLicensePlate: "HJH9472",
            color: "Black",
            brand: "Audi"
        })

        await request(app).post("/createCarRegistration").send({
            driverName: "Godofredo",
            carName: "Audi A4",
            reason_for_use: "I'll going to make uber this week !"
        });

        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Godofredo",
            carName: "Audi A4",
            reason_for_use: "I'll going to make uber this week !"
        });

        expect(create.body).toStrictEqual({ message: "Driver already have a car reservation !", statusCode: 401});
        expect(create.status).toBe(401);
    });

        it("Should not be able to create a 'Car Registration', if 'Car' already have a 'opened resevation in use'", async () => {
        
        await request(app).post("/createDriver").send({
            driverName: "Godofredo"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });

        await request(app).post("/createCarRegistration").send({
            driverName: "Godofredo",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

         await request(app).post("/createDriver").send({
            driverName: "Kiko"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });

        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Kiko",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });


        expect(create.body).toStrictEqual({ message: "Car is already in a reservation !", statusCode: 401});
        expect(create.status).toBe(401);
    });

});

describe("Cars Registrations Controller Tests, 'finishCarRegistration'", () => {

    beforeAll(async () => {
        await prismaService.cars_Registrations.deleteMany();
    });

    afterAll(async () => {
        await prismaService.cars_Registrations.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to 'Finish' a car reservation", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        const car = await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Chaves",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        const finish = await request(app).post("/finishCarRegistration/:carRegistration_id").send({
            driverName: "Chaves"
        }).query({
            carRegistration_id: create.body.id
        });

        expect(finish.body).toHaveProperty("id");
        expect(finish.body).toHaveProperty("start_date");
        expect(finish.body).toHaveProperty("end_date");
        expect(finish.body.driver_name).toBe("Chaves");
        expect(finish.body.car_name).toBe("Jetta");
        expect(finish.body).toHaveProperty("carLicensePlate");
        expect(finish.body.reason_for_use).toBe("I'll going to make uber this week !");
        expect(finish.body).toHaveProperty("createdAt");
        expect(finish.status).toBe(201);
    });

    it("Should not be able to 'Finish' a car reservation, if 'parameter' 'driverName' are 'empty'", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Chaves",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        const finish = await request(app).post("/finishCarRegistration/:carRegistration_id").send({
            driverName: ""
        }).query({
            carRegistration_id: create.body.id
        });

        expect(finish.body).toStrictEqual({ message: "DriverName must have a value OR, must have a string as a vvalue !", statusCode: 401 });
        expect(finish.status).toBe(401);
    });

    it("Should not be able to 'Finish' a car reservation, if 'parameter' 'driverName' are not found", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        await request(app).post("/createCarRegistration").send({
            driverName: "Chaves",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Pedro",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        const finish = await request(app).post("/finishCarRegistration/:carRegistration_id").send({
            driverName: "Pedroo"
        }).query({
            carRegistration_id: create.body.id
        });

        expect(finish.body).toStrictEqual({ message: "Driver not found !", statusCode: 404 });
        expect(finish.status).toBe(404);
    });

    it("Should not be able to 'Finish' a car reservation, if 'parameter' 'driverName' are the 'owner of car reservation'", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Chaves",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        const finish = await request(app).post("/finishCarRegistration/:carRegistration_id").send({
            driverName: "Kiko"
        }).query({
            carRegistration_id: create.body.id
        });

        expect(finish.body).toStrictEqual({ error: "Driver name must be the Owner of that CarRegistration !" });
        expect(finish.status).toBe(404);
    });

    it("Should not be able to 'Finish' a car reservation, if 'parameter' 'carRegistartion' are not found", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        await request(app).post("/createCarRegistration").send({
            driverName: "Chaves",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        const finish = await request(app).post("/finishCarRegistration/:carRegistration_id").send({
            driverName: "Chaves"
        }).query({
            carRegistration_id: "FAKE_ID"
        });

        expect(finish.body).toStrictEqual({ error: "Car registration not found !" });
        expect(finish.status).toBe(404);
    });

});

describe("Cars Registrations Controller Tests, 'searchAllCarsRegistration'", () => {

    beforeAll(async () => {
        await prismaService.cars_Registrations.deleteMany();
    });

    afterAll(async () => {
        await prismaService.cars_Registrations.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to 'Search' all cars reservations", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create = await request(app).post("/createCarRegistration").send({
            driverName: "Chaves",
            carName: "Jetta",
            reason_for_use: "I'll going to make uber this week !"
        });

        await request(app).post("/finishCarRegistration/:carRegistration_id").send({
            driverName: "Kiko"
        }).query({
            carRegistration_id: create.body.id
        });

        await request(app).post("/createDriver").send({
            driverName: "KikO"
        });

        await request(app).post("/createCar").send({
            carName: "Tiguan",
            carLicensePlate: "EEE9472",
            color: "Black",
            brand: "Volksvagem"
        });
        
        const create2 = await request(app).post("/createCarRegistration").send({
            driverName: "Kiko",
            carName: "Tiguan",
            reason_for_use: "I'll going to make uber this week !"
        });

        await request(app).post("/finishCarRegistration/:carRegistration_id").send({
            driverName: "Kiko"
        }).query({
            carRegistration_id: create2.body.id
        });

        const getAll = await request(app).get("/searchAllCarsRegistration");

        expect(getAll.body[0]).toHaveProperty("id");
        expect(getAll.body[0]).toHaveProperty("start_date");
        expect(getAll.body[0]).toHaveProperty("end_date");
        expect(getAll.body[0].driver_name).toBe("Chaves");
        expect(getAll.body[0].car_name).toBe("Jetta");
        expect(getAll.body[0]).toHaveProperty("carLicensePlate");
        expect(getAll.body[0].reason_for_use).toBe("I'll going to make uber this week !");
        expect(getAll.body[0]).toHaveProperty("createdAt");

        expect(getAll.body[1]).toHaveProperty("id");
        expect(getAll.body[1]).toHaveProperty("start_date");
        expect(getAll.body[1]).toHaveProperty("end_date");
        expect(getAll.body[1].driver_name).toBe("Kiko");
        expect(getAll.body[1].car_name).toBe("Tiguan");
        expect(getAll.body[1]).toHaveProperty("carLicensePlate");
        expect(getAll.body[1].reason_for_use).toBe("I'll going to make uber this week !");
        expect(getAll.body[1]).toHaveProperty("createdAt");

        expect(getAll.status).toBe(200);
    });

});