import { successResponse, errorResponse } from "../Services/apiResponse.js";
import { describe, it, expect, jest } from "@jest/globals";


describe("successResponse()", () => {
    it("should return a successful response with data", () => {
        const json = jest.fn();

        const res = {
            status: jest.fn().mockReturnThis(),
            json
        };

        successResponse(
            res,
            200,
            "Request successful",
            { name: "John" }
        );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(json).toHaveBeenCalledWith({
            success: true,
            message: "Request successful",
            data: { name: "John" }
        });
    });

    it("should use null when no data is provided", () => {
        const json = jest.fn();

        const res = {
            status: jest.fn().mockReturnThis(),
            json
        };

        successResponse(
            res,
            201,
            "Created successfully"
        );

        expect(json).toHaveBeenCalledWith({
            success: true,
            message: "Created successfully",
            data: null
        });
    });
});

describe("errorResponse()", () => {
    it("should return an error response with errors", () => {
        const json = jest.fn();

        const res = {
            status: jest.fn().mockReturnThis(),
            json
        };

        errorResponse(
            res,
            400,
            "Validation failed",
            ["Email is required"]
        );

        expect(res.status).toHaveBeenCalledWith(400);

        expect(json).toHaveBeenCalledWith({
            success: false,
            message: "Validation failed",
            errors: ["Email is required"]
        });
    });

    it("should use null when no errors are provided", () => {
        const json = jest.fn();

        const res = {
            status: jest.fn().mockReturnThis(),
            json
        };

        errorResponse(
            res,
            500,
            "Internal Server Error"
        );

        expect(json).toHaveBeenCalledWith({
            success: false,
            message: "Internal Server Error",
            errors: null
        });
    });
});