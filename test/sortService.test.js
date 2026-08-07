import { getValidatedSort } from "../Services/sortService.js";

describe("getValidatedSort()", () => {
    const allowedFields = [
        "name",
        "email",
        "createdAt",
        "salary"
    ];

    it("should return default sort when no sort is provided", () => {
        const result = getValidatedSort(undefined, allowedFields);

        expect(result).toBe("-createdAt");
    });

    it("should return valid ascending sort field", () => {
        const result = getValidatedSort("name", allowedFields);

        expect(result).toBe("name");
    });

    it("should return valid descending sort field", () => {
        const result = getValidatedSort("-salary", allowedFields);

        expect(result).toBe("-salary");
    });

    it("should throw error for invalid sort field", () => {
        expect(() => {
            getValidatedSort("age", allowedFields);
        }).toThrow("Invalid sort field");
    });

    it("should attach statusCode 400 to the error", () => {
        try {
            getValidatedSort("age", allowedFields);
        } catch (error) {
            expect(error.statusCode).toBe(400);
        }
    });
});