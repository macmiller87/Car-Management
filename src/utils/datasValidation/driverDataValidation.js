import { AppError } from "../errors/appError.js";

export async function Driver(driverName) {

    if(driverName === "") {
        return new AppError("DriverName must have a value !", 401);
    }

    if(typeof(driverName) !== "string") {
        return new AppError("DriverName must be a string as a value !", 401);
    }

    return true;
}