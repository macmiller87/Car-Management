import { Router } from "express";
import { AppError } from "./appError.js";

export const errorMidlleware = Router();

errorMidlleware.use((error, response) => {

    if(error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal Server Error ${error.message}`
    });

});