import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { PrismaService } from "../../../prismaORM/prismaService.js";
import { app } from "../../../index.js";
import request from "supertest";

const prismaService = new PrismaService();

describe("Drivers Controller Tests, 'CreateDriver'", () => {

    beforeAll(async () => {
        await prismaService.drivers.deleteMany();
    });

    afterAll(async () => {
        await prismaService.drivers.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to create a 'Driver'", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        expect(driver.body).toHaveProperty("id");
        expect(driver.body.name).toBe("Chaves");
        expect(driver.status).toBe(201);
    });

    it("Should not be able to create a 'Driver', if 'driverName' are 'empty'", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: ""
        });

        expect(driver.body).toStrictEqual({ error: "DriverName must have a value !" });
        expect(driver.status).toBe(401);
    });

    it("Should not be able to create a 'Driver', if 'driverName' are 'wrongly defined'", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: 365765
        });

        expect(driver.body).toStrictEqual({ error: "DriverName must be a string as a value !" });
        expect(driver.status).toBe(401);
    });

});

describe("Drivers Controller Tests, 'UpdateDriver'", () => {

    beforeAll(async () => {
        await prismaService.drivers.deleteMany();
    });

    afterAll(async () => {
        await prismaService.drivers.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to update a 'Driver'", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: "Chaves"
        });

        const update = await request(app).put("/updateDriver/:driver_id").send({
            driverName: "Kiko"
        }).query({
            driver_id: driver.body.id
        });

        expect(update.body).toHaveProperty("id");
        expect(update.body.name).toBe("Kiko");
        expect(update.status).toBe(200);
    });

    it("Should be able to update a 'Driver', if 'driver_id' are not found", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Madrughinha"
        });

        const update = await request(app).put("/updateDriver/:driver_id").send({
            driverName: "Tesouro"
        }).query({
            driver_id: "FAKE_ID"
        });

        expect(update.body).toStrictEqual({ message: "Driver not found !", statusCode: 404});
        expect(update.status).toBe(404);
    });

    
    it("Should be able to update a 'Driver', if 'driver_id' are 'empty'", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: "Jose"
        });

        const update = await request(app).put("/updateDriver/:driver_id").send({
            driverName: ""
        }).query({
            driver_id: driver.body.id
        });

        expect(update.body).toStrictEqual({ error: "DriverName must have a value !"});
        expect(update.status).toBe(401);
    });

    it("Should be able to update a 'Driver', if 'driver_id' are 'wrongly defined'", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: "Vitor"
        });

        const update = await request(app).put("/updateDriver/:driver_id").send({
            driverName: 63581926
        }).query({
            driver_id: driver.body.id
        });

        expect(update.body).toStrictEqual({ error: "DriverName must be a string as a value !" });
        expect(update.status).toBe(401);
    });

});

describe("Drivers Controller Tests, 'DeleteDriver'", () => {

    beforeAll(async () => {
        await prismaService.drivers.deleteMany();
    });

    afterAll(async () => {
        await prismaService.drivers.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to 'Delete' a driver", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: "Vitor"
        });

        const del = await request(app).delete("/deleteDriver/:driver_id").query({
            driver_id: driver.body.id
        });

        expect(del.body).toStrictEqual({ message: "Driver deleted with success !" });
        expect(del.status).toBe(200);
    });

    it("Should not be able to 'Delete' a driver, if 'driver_id' are not found", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Basilio"
        });

        const del = await request(app).delete("/deleteDriver/:driver_id").query({
            driver_id: "FAKE_ID"
        });

        expect(del.body).toStrictEqual({ message: "Driver not found !", statusCode: 404 });
        expect(del.status).toBe(404);
    });

});

describe("Drivers Controller Tests, 'DriverSerch'", () => {

    beforeAll(async () => {
        await prismaService.drivers.deleteMany();
    });

    afterAll(async () => {
        await prismaService.drivers.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to 'Search' a driver", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: "Vitor"
        });

        const search = await request(app).get("/searchDriver/:driver_id").query({
            driver_id: driver.body.id
        });

        expect(search.body).toHaveProperty("id");
        expect(search.body.name).toBe(driver.body.name);
        expect(search.status).toBe(200);
    });

    it("Should not be able to 'Delete' a driver, if 'driver_id' are not found", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Basilio"
        });

        const search = await request(app).get("/searchDriver/:driver_id").query({
            driver_id: "FAKE_ID"
        });

        expect(search.body).toStrictEqual({ message: "Driver not found !", statusCode: 404});
        expect(search.status).toBe(404);
    });

});

describe("Drivers Controller Tests, 'DriverSearchByName'", () => {

    beforeAll(async () => {
        await prismaService.drivers.deleteMany();
    });

    afterAll(async () => {
        await prismaService.drivers.deleteMany();
        await prismaService.$disconnect();
    });

    it("Should be able to 'Search' a driver by name", async () => {

        const driver = await request(app).post("/createDriver").send({
            driverName: "Girafales"
        });

        const search = await request(app).get("/driverSearchByName/").set("driver_name", driver.body.name);

        expect(search.body).toHaveProperty("id");
        expect(search.body.name).toBe(driver.body.name);
        expect(search.status).toBe(200);
    });

    it("Should not be able to 'Search' a driver, if 'driverName' are 'empty'", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Basilio"
        });

        const search = await request(app).get("/driverSearchByName/").set("driver_name", "");

        expect(search.body).toStrictEqual({ error: "DriverName must have a value !" });
        expect(search.status).toBe(401);
    });

    it("Should not be able to 'Search' a driver, if 'driverName' are 'wrongly defined'", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Basilio"
        });

        const search = await request(app).get("/driverSearchByName/").set("driver_name", 352345);;

        expect(search.body).toStrictEqual({ message: "Driver not found !" });
        expect(search.status).toBe(404);
    });

    it("Should not be able to 'Search' a driver, if 'driverName' are not found", async () => {

        await request(app).post("/createDriver").send({
            driverName: "Basilio"
        });

        const search = await request(app).get("/driverSearchByName/").set("driver_name", "FAKE_ID");;

        expect(search.body).toStrictEqual({ message: "Driver not found !" });
        expect(search.status).toBe(404);
    });

});

