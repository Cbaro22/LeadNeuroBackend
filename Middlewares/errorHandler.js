import { errorResponse } from "../Services/apiResponse.js";

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    return errorResponse(
        res,
        statusCode,
        err.message || "Internal Server Error"
    );
};