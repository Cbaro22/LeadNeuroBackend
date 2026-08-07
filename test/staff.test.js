import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Staff from "../Models/Staff.js";
import * as staffController from "../Controllers/staffCtrls.js";
import { jest } from "@jest/globals";
import { handleForgotPassword } from "../Controllers/staffCtrls.js";
import request from "supertest";
import app from "../app.js";
import { handleDeleteStaff } from "../Controllers/staffCtrls.js";
import { handleResetPassword } from "../Controllers/staffCtrls.js";
import * as crypto from "crypto";


describe("Lead Neuro Backend API", () => {


describe("Staff Controller", () => {
  let email;
     let accessToken;

beforeAll(async () => {
    const response = await request(app)
        .post("/api/v1/staff/login")
        .send({
            email: "airdropclerk@gmail.com",
            password: "Meta2026#"
        });

    accessToken = response.body.data.accessToken;
});

    test("should get all staff", async () => {

        const response = await request(app)
            .get("/api/v1/staff/all_Staff")
            .set("Authorization", `Bearer ${accessToken}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty("staff");

        expect(Array.isArray(response.body.data.staff)).toBe(true);

    });
    test("should paginate staff", async () => {

    const response = await request(app)
        .get("/api/v1/staff/all_Staff?page=1&limit=5")
        .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.data.currentPage).toBe(1);

    expect(response.body.data.limit).toBe(5);

});

test("should search staff by name", async () => {

    const response = await request(app)
        .get("/api/v1/staff/all_Staff?search=bea")
        .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.staff.length).toBeGreaterThan(0);

});

test("should filter by role", async () => {

    const response = await request(app)
        .get("/api/v1/staff/all_Staff?role=admin")
        .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

});

test("should sort staff by salary", async () => {

    const response = await request(app)
        .get("/api/v1/staff/all_Staff?sort=salary")
        .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

});

test("should return selected fields only", async () => {

    const response = await request(app)
        .get("/api/v1/staff/all_Staff?fields=name,email")
        .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.data.staff[0]).toHaveProperty("name");

    expect(response.body.data.staff[0]).toHaveProperty("email");

    expect(response.body.data.staff[0]).not.toHaveProperty("salary");

    expect(response.body.data.staff[0]).not.toHaveProperty("department");

});

test("should register a new staff successfully", async () => {

    const email = `test${Date.now()}@gmail.com`;

    const response = await request(app)
        .post("/api/v1/staff/register")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
    name: "John Doe",
    email: email,
    password: "Password123#",
    phone: "08012345678",
    Address: "Lagos, Nigeria",
    role: "doctor",
    department: "Cardiology",
    salary: 250000
})

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Staff created successfully");

    expect(response.body.data.staff).toHaveProperty("email");

    expect(response.body.data.staff.email).toBe(email);

});

test("should not register staff with an existing email", async () => {

    const response = await request(app)
        .post("/api/v1/staff/register")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            name: "John Doe",
            email: "airdropclerk@gmail.com",
            password: "Password123#",
            phone: "08012345678",
            Address: "Lagos",
            role: "doctor",
            department: "Cardiology",
            salary: 250000
        });

    expect(response.statusCode).toBe(409);

    expect(response.body.success).toBe(false);

});

test("should return validation error when required fields are missing", async () => {

    const response = await request(app)
        .post("/api/v1/staff/register")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({});

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

});

test("should reject an invalid role", async () => {

    const response = await request(app)
        .post("/api/v1/staff/register")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            name: "John Doe",
            email: "john.invalid@test.com",
            password: "Password123#",
            phone: "08012345678",
            Address: "Lagos",
            role: "pilot",
            department: "Cardiology",
            salary: 250000
        });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

});

test("should reject an invalid salary", async () => {

    const response = await request(app)
        .post("/api/v1/staff/register")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            name: "John Doe",
            email: "salary@test.com",
            password: "Password123#",
            phone: "08012345678",
            Address: "Lagos",
            role: "doctor",
            department: "Cardiology",
            salary: "abc"
        });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

});

describe("Get Staff By ID", () => {
  let token;
  let staffId;

  beforeAll(async () => {
    // Login as admin
    const login = await request(app)
      .post("/api/v1/staff/login")
      .send({
        email: "airdropclerk@gmail.com",
            password: "Meta2026#"
      });

    token = login.body.data.accessToken;

    // Create a staff
    const staff = await Staff.create({
      name: "John Doe",
      email: "johnget@test.com",
      password: await bcrypt.hash("Password123!", 10),
      phone: "08012345678",
      address: "Warri",
      role: "nurse",
      department: "Emergency",
      salary: 120000,
    });

    staffId = staff._id;
  });

  afterAll(async () => {
    await Staff.findByIdAndDelete(staffId);
  });

  test("should get one staff successfully", async () => {
    const res = await request(app)
      .get(`/api/v1/staff/one_Staff/${staffId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.staff._id).toBe(staffId.toString());
    expect(res.body.data.staff.email).toBe("johnget@test.com");
  });

  test("should return 400 for invalid staff id", async () => {
    const res = await request(app)
      .get("/api/v1/staff/one_Staff/123")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid staff ID");
  });

  test("should return 404 when staff does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get(`/api/v1/staff/one_Staff/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Staff not found");
  });
});

describe("Update Staff", () => {
let accessToken;
  let staffId;
  let email;

  beforeEach(async () => {
    const login = await request(app)
      .post("/api/v1/staff/login")
      .send({
        email: "airdropclerk@gmail.com",
        password: "Meta2026#",
      });

    accessToken = login.body.data.accessToken;

    email = `update${Date.now()}@test.com`;

    const staff = await Staff.create({
      name: "Update Test",
      email,
      password: await bcrypt.hash("Meta2026#", 10),
      phone: "08012345678",
      Address: "Benin",
      role: "cleaner",
      department: "Cleaning",
      salary: 50000,
    });

    staffId = staff._id;
  });

 afterEach(async () => {
    await Staff.findByIdAndDelete(staffId);
});

it("should update a staff successfully", async () => {
  const updatedEmail = `update${Date.now()}@test.com`;

  const res = await request(app)
    .put(`/api/v1/staff/update/${staffId}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      name: "Updated Staff",
      email:updatedEmail,
      salary: 80000,
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data.name).toBe("Updated Staff");
  expect(res.body.data.email).toBe(updatedEmail);
  expect(res.body.data.salary).toBe(80000);
});

it("should return 400 for invalid staff id", async () => {
  const res = await request(app)
    .put("/api/v1/staff/update/123")
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      name: "Updated Staff",
    });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Invalid staff ID");
});

it("should return 404 when staff does not exist", async () => {
  const fakeId = new mongoose.Types.ObjectId();

  const res = await request(app)
    .put(`/api/v1/staff/update/${fakeId}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      name: "Updated Staff",
    });

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toBe("Staff not found");
});

it("should return validation error for invalid salary", async () => {
  const res = await request(app)
    .put(`/api/v1/staff/update/${staffId}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      salary: "abc",
    });

  expect(res.statusCode).toBe(400);
});

});

describe("handleCreateStaff()", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should call next when database throws an error", async () => {

        const req = {
            body: {
                name: "John Doe",
                email: "john@test.com",
                password: "Password123#",
                phone: "08012345678",
                Address: "Warri",
                role: "doctor",
                department: "Cardiology",
                salary: 250000
            }
        };

        const res = {};

        const next = jest.fn();

      
        jest.spyOn(Staff, "findOne").mockResolvedValue(null);

        
        jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");

        
        jest.spyOn(Staff, "create")
            .mockRejectedValue(new Error("Database Error"));

        await staffController.handleCreateStaff(req, res, next);

        expect(next).toHaveBeenCalled();

        expect(next.mock.calls[0][0].message)
            .toBe("Database Error");

    });

});

describe("handleForgotPassword()", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should call next when database throws an error", async () => {

        const req = {
            body: {
                email: "john@test.com"
            }
        };

        const res = {};

        const next = jest.fn();

        const dbError = new Error("Database crashed");

        jest.spyOn(Staff, "findOne").mockRejectedValue(dbError);

        await handleForgotPassword(req, res, next);

        expect(next).toHaveBeenCalledWith(dbError);

    });

});

describe("handleResetPassword()", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should call next when database throws an error", async () => {

        const req = {
            body: {
                email: "john@test.com",
                token: "123456",
                password: "Password123#"
            }
        };

        const res = {};

        const next = jest.fn();

        const dbError = new Error("Database crashed");

        jest.spyOn(Staff, "findOne").mockRejectedValue(dbError);

        await handleResetPassword(req, res, next);

        expect(next).toHaveBeenCalledWith(dbError);

    });

});

describe("handleDeleteStaff()", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should call next when Staff.findById throws an error", async () => {

        const req = {
            params: {
                id: new mongoose.Types.ObjectId().toString()
            }
        };

        const res = {};

        const next = jest.fn();

        const dbError = new Error("Database crashed");

        jest.spyOn(Staff, "findById").mockRejectedValue(dbError);

        await handleDeleteStaff(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(dbError);

    });

});

});
});
