import { describe, it, expect } from "@jest/globals";
import corsOptions from "../config/corsOptions.js";

describe("corsOptions", () => {
    it("should allow requests with no origin", () => {
        const callback = (err, allowed) => {
            expect(err).toBeNull();
            expect(allowed).toBe(true);
        };

        corsOptions.origin(undefined, callback);
    });

    it("should allow requests from allowed origins", () => {
        const callback = (err, allowed) => {
            expect(err).toBeNull();
            expect(allowed).toBe(true);
        };

        corsOptions.origin("http://localhost:3000", callback);
    });

    it("should reject requests from disallowed origins", () => {
        const callback = (err, allowed) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Not allowed by CORS");
            expect(allowed).toBeUndefined();
        };

        corsOptions.origin("http://malicious-site.com", callback);
    });

    it("should have credentials enabled", () => {
        expect(corsOptions.credentials).toBe(true);
    });

    it("should have status code 200 for successful OPTIONS requests", () => {
        expect(corsOptions.optionsSuccessStatus).toBe(200);
    });
});