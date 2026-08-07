
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";
import { jest } from "@jest/globals";
import app from "../app.js";
import Staff from "../Models/Staff.js";
import { generateAccessToken } from "../Services/tokenServices.js";
import {
    validateStaff,
    authentication,
    Authorization
} from "../Middlewares/ValidateStaff.js";
let staff;
let token;

beforeAll(async () => {

    staff = await Staff.create({
        name: "Middleware Test",
        email: "middleware@test.com",
        password: "$2b$10$S1x2P6aY8d2G1bKzJmHq7eP2F2QxJYlT9v3QJv1mL7kXrY7M2R4uW", // hashed password
        phone: "08012345678",
        Address: "Test Address",
        role: "admin",
        department: "Admin",
        salary: 50000
    });

    token = generateAccessToken(staff);

});

afterAll(async () => {

    if (mongoose.connection.readyState === 1) {

        await Staff.deleteMany({
            email: /middleware@test.com/
        });

    }

});

describe("validateStaff()", () => {

    test("should return 400 when fields are missing", async () => {

        const response = await request(app)
            .post("/api/v1/staff/login")
            .send({});

        expect(response.statusCode).toBe(400);

    });

    it("should call next for valid email and password", async () => {

    const req = {
        body: {
            email: "john@test.com",
            password: "Password123#"
        }
    };

    const res = {
        status: jest.fn(),
        json: jest.fn()
    };

    const next = jest.fn();

    await validateStaff(req, res, next);

    expect(next).toHaveBeenCalled();
});

    test("should return 400 for short password", async () => {

    const req = {
        body: {
            email: "abc@test.com",
            password: "123"
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const next = jest.fn();

    await validateStaff(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
        message: "Password must be at least 6 characters long"
    });

    expect(next).not.toHaveBeenCalled();

});

it("should return 400 when password is missing", async () => {

    const req = {
        body:{
            email:"john@test.com"
        }
    };

    const res={
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    };

    const next=jest.fn();

    await validateStaff(req,res,next);

    expect(res.status).toHaveBeenCalledWith(400);
});

it("should return 400 when email is missing", async () => {

    const req = {
        body:{
            password:"Password123#"
        }
    };

    const res={
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    };

    const next=jest.fn();

    await validateStaff(req,res,next);

    expect(res.status).toHaveBeenCalledWith(400);
});

});

describe("authentication()", () => {

    test("should return 401 when no token is provided", async () => {

        const response = await request(app)
            .get("/api/v1/staff/all_Staff");

        expect(response.statusCode).toBe(401);

    });

    test("should reject invalid token", async () => {

    const response = await request(app)
        .get("/api/v1/staff/all_Staff")
        .set("Authorization", "Bearer invalidtoken");

    expect(response.statusCode).toBe(401);

});

test("should return 404 when staff account does not exist", async () => {

    const fakeToken = jwt.sign(
        {
            id: new mongoose.Types.ObjectId(),
            role: "admin"
        },
        process.env.ACCESS_TOKEN
    );

    const response = await request(app)
        .get("/api/v1/staff/all_Staff")     // <-- Request the protected route
        .set("Authorization", `Bearer ${fakeToken}`); // <-- Attach the token here

    expect(response.statusCode).toBe(404);
});

it("should return 401 when req.staff is missing", () => {

    const req = {};

    const json = jest.fn();

    const res = {
        status: jest.fn(() => ({ json }))
    };

    const next = jest.fn();

    Authorization("admin")(req,res,next);

    expect(res.status).toHaveBeenCalledWith(401);
});



test("should authenticate successfully", async () => {

    const response = await request(app)
        .get("/api/v1/staff/all_Staff")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

});



test("should reject invalid token", async () => {

    const response = await request(app)
        .get("/api/v1/staff/all_Staff")
        .set("Authorization", "Bearer invalidtoken");

    expect(response.statusCode).toBe(401);

});

test("should return 404 when staff account does not exist", async () => {

    const fakeToken = jwt.sign(
        {
            id: new mongoose.Types.ObjectId(),
            role: "admin"
        },
        process.env.ACCESS_TOKEN
    );

    const response = await request(app)
        .get("/api/v1/staff/all_Staff")
        .set("Authorization", `Bearer ${fakeToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Staff account not found");

});

it("should return 403 when role is not allowed", () => {

    const req = {
        staff: {
            role: "doctor"
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const next = jest.fn();

    Authorization("admin")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
        message: "Unauthorized Access"
    });

    expect(next).not.toHaveBeenCalled();

});



it("should call next when role is authorized", () => {
    const req = {
        staff: {
            role: "admin"
        }
    };

    const res = {};

    const next = jest.fn();

    Authorization("admin")(req, res, next);

    expect(next).toHaveBeenCalled();
});

});

