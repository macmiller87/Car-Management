import { AppError } from "../errors/appError.js";

export async function Cars(carName, carLicensePlate, color, brand) {

    if(carName === "" || carLicensePlate === "" || color === "" || brand === "") {
        return new AppError("All data must have a value !", 401);
    }

    if(typeof(carName) !== "string" || typeof(carLicensePlate) !== "string" || typeof(color) !== "string" || typeof(brand) !== "string") {
        return new AppError("All data must be a string as a value !", 401);
    }

    return true;
}

export async function SearchAllCarsByfields(color, brand) {

    if(typeof(color) !== "string" || typeof(brand) !== "string") {
        return new AppError("All data must be a string as a value !", 401);
    }

    return true;
}