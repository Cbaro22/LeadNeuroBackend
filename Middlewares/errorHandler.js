import { errorResponse } from "../Services/apiResponse.js";

export default function errorHandler(err, req, res, next) {

    console.log("STATUS:", err.statusCode);
    console.log("MESSAGE:", err.message);
    console.log("STACK:", err.stack);

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}