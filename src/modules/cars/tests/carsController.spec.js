import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { PrismaService } from "../../../prismaORM/prismaService.js";
import { app } from "../../../index.js";
import request from "supertest";

const prismaService = new PrismaService();

describe("Cars Controller Tests, 'CreateCar", () => {

    beforeAll(async () => {
        await prismaService.cars.deleteMany();
    });

    afterAll(async () => {
        await prismaService.cars.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to create a Car", async () =>{

        const car = await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "CCC9472",
            color: "Black",
            brand: "Volksvagem"
        });

        expect(car.body).toHaveProperty("id");
        expect(car.body.carName).toBe(car.body.carName);
        expect(car.body.carLicensePlate).toBe(car.body.carLicensePlate);
        expect(car.body.color).toBe(car.body.color);
        expect(car.body.brand).toBe(car.body.brand);
        expect(car.status).toBe(201);
    });

    it("Should not be able to create a Car, if any of the 'Parameters' are 'Empty' ", async () =>{

        const car = await request(app).post("/createCar").send({
            carName: "",
            carLicensePlate: "AAA7254",
            color: "Black",
            brand: "Volksvagem"
        });

        expect(car.body).toStrictEqual({ error: "All data must have a value !" });
        expect(car.status).toBe(401);
    });

    it("Should not be able to create a Car, if any of the typeof the 'Parameters' are in a wrong 'Definition'", async () =>{

        const car = await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "BBB7254",
            color: 8888,
            brand: "Volksvagem"
        });

        expect(car.body).toStrictEqual({ error: "All data must be a string as a value !" });
        expect(car.status).toBe(401);
    });

    it("Should be able to create a Car, it the 'Parameter' 'carlicenseplate' not be 'Unic'", async () =>{

        await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "HHH1234",
            color: "Black",
            brand: "Volksvagem"
        });

          const car2 = await request(app).post("/createCar").send({
            carName: "Jetta",
            carLicensePlate: "HHH1234",
            color: "white",
            brand: "Volksvagem"
        });

        expect(car2.body).toStrictEqual({ message: "CarlicensePlate is already in use !", statusCode: 401 });
        expect(car2.status).toBe(401);
    });

});

describe("Cars Controller Tests, 'updateCar", () => {
        
    beforeAll(async () => {
        await prismaService.cars.deleteMany();
    });

    afterAll(async () => {
        await prismaService.cars.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to update a car 'Field", async () => {

        const car = await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "KAKA7788",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const car2 = await request(app).patch("/updateCar/:car_id").send({
            carName: "Golf",
            color: "White"
        }).query({
            car_id: car.body.id
        });

        expect(car2.body).toHaveProperty("id");
        expect(car2.body.carName).toBe(car2.body.carName);
        expect(car2.body.carLicensePlate).toBe(car2.body.carLicensePlate);
        expect(car2.body.color).toBe(car2.body.color);
        expect(car2.body.brand).toBe(car2.body.brand);
        expect(car2.status).toBe(200);
    });

    it("Should not be able to update a car, if 'car_id' aren't found", async () => {

        await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "FFF7788",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const car2 = await request(app).patch("/updateCar/:car_id").send({
            carName: "Golf",
            color: "White"
        }).query({
            car_id: "FAKE_ID"
        });

        expect(car2.body).toStrictEqual({ message: "Car not found !", statusCode: 404 });
        expect(car2.status).toBe(404);
    });

    it("Should not be able to update a car, if 'if any of the 'Parameters' are 'Empty'", async () => {

        const car = await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "NNN7788",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const car2 = await request(app).patch("/updateCar/:car_id").send({
            carName: "",
            color: "White"
        }).query({
            car_id: car.body.id
        });

        expect(car2.body).toStrictEqual({ error: "All data must have a value !" });
        expect(car2.status).toBe(401);
    });

    
    it("Should not be able to update a car, if any of the typeof the 'Parameters' are in a wrong 'Definition'", async () => {

        const car = await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "SSS7788",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const car2 = await request(app).patch("/updateCar/:car_id").send({
            carName: "Golf",
            color: 8686
        }).query({
            car_id: car.body.id
        });

        expect(car2.body).toStrictEqual({ error: "All data must be a string as a value !" });
        expect(car2.status).toBe(401);
    });

});

describe("Cars Controller Tests, 'DeleteCar", () => {
    beforeAll(async () => {
        await prismaService.cars.deleteMany();
    });

    afterAll(async () => {
        await prismaService.cars.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to 'delete' a car", async () => {

        const car = await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "SSS7788",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const del = await request(app).delete("/deleteCar/:car_id").query({
            car_id: car.body.id
        });

        expect(del.body).toStrictEqual({ message: "Car deleted with sucess !" });
        expect(del.status).toBe(200);
    }); 

    it("Should not be able to 'delete' a car, if 'car_id' are not found", async () => {

        await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "OOP6655",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const del = await request(app).delete("/deleteCar/:car_id").query({
            car_id: "FAKE_ID"
        });

        expect(del.body).toStrictEqual({ message: "Car not found !", statusCode: 404 });
        expect(del.status).toBe(404);
    }); 

});

describe("Cars Controller Tests, 'CarSearch", () => {
    beforeAll(async () => {
        await prismaService.cars.deleteMany();
    });

    afterAll(async () => {
        await prismaService.cars.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to 'serach' a car", async () => {

        const car = await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "DDD7788",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const search = await request(app).get("/searchCar/").set('car_id', car.body.id);

        expect(search.body).toHaveProperty("id");
        expect(search.body.carName).toBe(car.body.carName);
        expect(search.body.carLicensePlate).toBe(car.body.carLicensePlate);
        expect(search.body.color).toBe(car.body.color);
        expect(search.body.brand).toBe(car.body.brand);
        expect(search.status).toBe(200);
    }); 

    it("Should not be able to 'search' a car, if 'car_id' are not found", async () => {

        await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "RER6655",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const search = await request(app).get("/searchCar/").set('car_id', "FAKE_ID");

        expect(search.body).toStrictEqual({ message: "Car not found !", statusCode: 404 });
        expect(search.status).toBe(404);
    }); 

});

describe("Cars Controller Tests, 'SearchAllCars", () => {
    beforeAll(async () => {
        await prismaService.cars.deleteMany();
    });

    afterAll(async () => {
        await prismaService.cars.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to 'search' all registered cars", async () => {

        const car = await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "YYY7788",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const car2 = await request(app).post("/createCar").send({
            carName: "Audi 4",
            carLicensePlate: "DDD7788",
            color: "White",
            brand: "Audi"
        }); 

        const search = await request(app).get("/searchAllCars").send({
            color: "Black",
            brand: "Audi"
        });

        expect(search.body[0]).toHaveProperty("id");
        expect(search.body[0].carName).toBe(car.body.carName);
        expect(search.body[0].carLicensePlate).toBe(car.body.carLicensePlate);
        expect(search.body[0].color).toBe(car.body.color);
        expect(search.body[0].brand).toBe(car.body.brand);

        expect(search.body[1]).toHaveProperty("id");
        expect(search.body[1].carName).toBe(car2.body.carName);
        expect(search.body[1].carLicensePlate).toBe(car2.body.carLicensePlate);
        expect(search.body[1].color).toBe(car2.body.color);
        expect(search.body[1].brand).toBe(car2.body.brand);

        expect(search.status).toBe(200);
    }); 

    it("Should not be able to 'search' all cars, if any 'parameter' are 'wrongly defined'", async () => {

        await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "RER6655",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const search = await request(app).get("/searchAllCars").send({
            color: 8198,
            brand: ""
        });

        expect(search.body).toStrictEqual({ message: "Color must be a string as a value !", statusCode: 401 });
        expect(search.status).toBe(401);
    }); 

    it("Should not be able to 'search' all cars, if any 'parameter' are not found", async () => {

        await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "RER6655",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const search = await request(app).get("/searchAllCars").send({
            color: "white",
            brand: ""
        });

        expect(search.body).toStrictEqual({ message: "There isn't any car with that color, OR color not found !", statusCode: 404 });
        expect(search.status).toBe(404);
    }); 

    it("Should not be able to 'search' all cars, if any 'parameter' don't have a valid value", async () => {

        await request(app).post("/createCar").send({
            carName: "jetta",
            carLicensePlate: "GTG6655",
            color: "Black",
            brand: "Volksvagem"
        }); 

        const search = await request(app).get("/searchAllCars").send({
            color: "",
            brand: ""
        });

        expect(search.body).toStrictEqual({ message: "At least one field must have a valid value !", statusCode: 401 });
        expect(search.status).toBe(401);
    }); 

});