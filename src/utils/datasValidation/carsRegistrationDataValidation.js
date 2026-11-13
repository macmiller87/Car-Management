import { AppError } from "../errors/appError.js";

export async function CarsRegistration(driverName, carName, reason_for_use) {

    if(driverName === "" || carName === "" || reason_for_use === "") {
        return new AppError("All data must have a value !", 401);
    }

    if(typeof(driverName) !== "string" || typeof(carName) !== "string" || typeof(reason_for_use) !== "string") {
        return new AppError("All datas must be a string as a value !", 401);
    }

    return true;
}