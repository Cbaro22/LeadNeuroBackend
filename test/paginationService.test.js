import { getPagination } from "../Services/paginationServices.js";

describe("getPagination()", () => {

    it("should return pagination for the first page", () => {
        const result = getPagination(1, 10, 50);

        expect(result).toEqual({
            currentPage: 1,
            totalPages: 5,
            limit: 10,
            totalItems: 50,
            hasNextPage: true,
            hasPreviousPage: false,
            nextPage: 2,
            previousPage: null
        });
    });

    it("should return pagination for a middle page", () => {
        const result = getPagination(3, 10, 50);

        expect(result).toEqual({
            currentPage: 3,
            totalPages: 5,
            limit: 10,
            totalItems: 50,
            hasNextPage: true,
            hasPreviousPage: true,
            nextPage: 4,
            previousPage: 2
        });
    });

    it("should return pagination for the last page", () => {
        const result = getPagination(5, 10, 50);

        expect(result).toEqual({
            currentPage: 5,
            totalPages: 5,
            limit: 10,
            totalItems: 50,
            hasNextPage: false,
            hasPreviousPage: true,
            nextPage: null,
            previousPage: 4
        });
    });

    it("should handle a single page of results", () => {
        const result = getPagination(1, 10, 5);

        expect(result).toEqual({
            currentPage: 1,
            totalPages: 1,
            limit: 10,
            totalItems: 5,
            hasNextPage: false,
            hasPreviousPage: false,
            nextPage: null,
            previousPage: null
        });
    });

});