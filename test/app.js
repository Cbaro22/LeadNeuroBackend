import request from "supertest";
import app from "../app.js"

test("GET /api/v1 should return welcome message", async () => {

        const response = await request(app)
            .get("/api/v1");

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.message)
            .toBe("Welcome to Lead Neuro Backend API v1");

    });