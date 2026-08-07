import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Cleaner from "../Models/Cleaner.js";
import Staff from "../Models/Staff.js";
import { handlecreatecleaner } from "../Controllers/CleanerCtrls.js";
import { jest } from "@jest/globals";
import cache from "../Services/cacheServices.js";
import jwt from "jsonwebtoken"; 

let adminToken;
let cleanerStaffId;

beforeAll(async () => {
    // Login as admin
    const login = await request(app)
        .post("/api/v1/staff/login")
        .send({
            email: "airdropclerk@gmail.com",
            password: "Meta2026#"
        });

    adminToken = login.body.data.accessToken;

    // Register a cleaner staff
    const staff = await request(app)
        .post("/api/v1/staff/register")
        .send({
            name: "Cleaner Staff",
            email: `cleaner${Date.now()}@gmail.com`,
            password: "Password123!",
            phone: "08012345678",
            Address: "Warri",
            role: "cleaner",
            department: "Cleaning",
            salary: 50000
        });

    console.log("REGISTER RESPONSE:", staff.body);

    cleanerStaffId = staff.body.data.staff._id;

    console.log("Cleaner Staff ID:", cleanerStaffId);
});
afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});
describe("Create Cleaner", () => {

    it("should create cleaner successfully", async () => {

        const res = await request(app)
            .post(`/api/v1/cleaner/create_Cleaner/${cleanerStaffId}`)
            .send({
                shift: "Morning",
                supervisor: "Mr James",
                areaAssigned: "Ward A",
                workSchedule: "Monday-Friday"
            });

        console.log(res.body);

        expect(res.statusCode).toBe(201);
    });

    it("should return 400 when required fields are missing", async () => {

        const res = await request(app)
            .post(`/api/v1/cleaner/create_Cleaner/${cleanerStaffId}`)
            .send({});

        expect(res.statusCode).toBe(400);
    });

    it("should return 400 for invalid staff id", async () => {

        const res = await request(app)
            .post("/api/v1/cleaner/create_Cleaner/123")
            .send({
                shift: "Morning",
                supervisor: "Mr James",
                areaAssigned: "Ward A",
                workSchedule: "Monday-Friday"
            });

        expect(res.statusCode).toBe(400);
    });

    it("should return 404 when staff does not exist", async () => {

        const fakeId = new mongoose.Types.ObjectId().toString();

        const res = await request(app)
            .post(`/api/v1/cleaner/create_Cleaner/${fakeId}`)
            .send({
                shift: "Morning",
                supervisor: "Mr James",
                areaAssigned: "Ward A",
                workSchedule: "Monday-Friday"
            });

        expect(res.statusCode).toBe(404);
    });

    it("should return 400 when cleaner already exists", async () => {

        const res = await request(app)
            .post(`/api/v1/cleaner/create_Cleaner/${cleanerStaffId}`)
            .send({
                shift: "Morning",
                supervisor: "Mr James",
                areaAssigned: "Ward A",
                workSchedule: "Monday-Friday"
            });

        expect(res.statusCode).toBe(400);
    });

});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

describe("Get Cleaners", () => {

    it("should get all cleaners", async () => {

        const res = await request(app)
            .get("/api/v1/cleaner/all_Cleaners")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

    it("should paginate cleaners", async () => {

        const res = await request(app)
            .get("/api/v1/cleaner/all_Cleaners?page=1&limit=5")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

    it("should search cleaners", async () => {

        const res = await request(app)
            .get("/api/v1/cleaner/all_Cleaners?search=Ward")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

    it("should default page to 1 when page is negative", async () => {

    const response = await request(app)
        .get("/api/v1/cleaner/all_Cleaners?page=-5")
        .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.data.currentPage).toBe(1);

});


it("should cap limit at 100", async () => {

    const response = await request(app)
        .get("/api/v1/cleaner/all_Cleaners?limit=1000")
        .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

});

it("should default to page 1 when page is invalid", async () => {

    const response = await request(app)
        .get("/api/v1/cleaner/all_Cleaners?page=abc")
        .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.data.currentPage).toBe(1);

});

    it("should filter cleaners", async () => {

        const res = await request(app)
            .get("/api/v1/cleaner/all_Cleaners?shift=Morning")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

describe("Get Cleaner By Id", () => {

    it("should get one cleaner", async () => {

        const res = await request(app)
            .get(`/api/v1/cleaner/one_Cleaner/${cleanerStaffId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

    it("should return 400 for invalid id", async () => {

        const res = await request(app)
            .get("/api/v1/cleaner/one_Cleaner/123")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(400);
    });

});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

describe("Update Cleaner", () => {

    it("should update cleaner successfully", async () => {

        const res = await request(app)
            .put(`/api/v1/cleaner/update_Cleaner/${cleanerStaffId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                shift: "Night",
                supervisor: "Mrs Grace",
                areaAssigned: "ICU",
                workSchedule: "Weekend"
            });

        expect(res.statusCode).toBe(200);
    });

});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});


describe("Delete Cleaner", () => {

    it("should delete cleaner successfully", async () => {

        const res = await request(app)
            .delete(`/api/v1/cleaner/delete_Cleaner/${cleanerStaffId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});


describe("handleDeleteCleaner()", () => {

    it("should return 400 for invalid staff id", async () => {

    });

    it("should return 404 when cleaner is not found", async () => {

    });

    it("should delete cleaner successfully", async () => {

    });

    it("should call next when database throws", async () => {

    });

});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});


describe("handleUpdateCleaner()", () => {

    it("should return 400 when fields are missing", async () => {

    });

    it("should return 400 for invalid id", async () => {

    });

    it("should return 404 when cleaner is not found", async () => {

    });

    it("should update cleaner successfully", async () => {

    });

    it("should call next when update throws", async () => {

    });

});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});



describe("handlecreatecleaner()", () => {

    it("should call next when database throws an error", async () => {

        // Arrange
        const req = {
            params: {
                staff_id: "6890c6d9d4c2b1f5b5d2e123" // valid ObjectId
            },
            body: {
                shift: "Morning",
                supervisor: "John",
                areaAssigned: "Ward A",
                workSchedule: "Mon-Fri"
            }
        };

        const res = {};

        const next = jest.fn();

        // Mock previous database calls
        jest.spyOn(Cleaner, "findOne").mockResolvedValue(null);
        jest.spyOn(Staff, "findById").mockResolvedValue({
            _id: req.params.staff_id
        });

        
        jest.spyOn(Cleaner, "create")
            .mockRejectedValue(new Error("DB Error"));

        
        await handlecreatecleaner(req, res, next);

        expect(next).toHaveBeenCalled();

    });

});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

describe("handlegetAllCleaners() - Cache", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

   it("should return cached data when cache exists", async () => {

    const cachedData = {
        cleaners: [{ shift: "Morning" }],
        totalCleaners: 1
    };

    jest.spyOn(cache, "get").mockReturnValue(cachedData);

    const login = await request(app)
        .post("/api/v1/staff/login")
        .send({
            email: "airdropclerk@gmail.com",
            password: "Meta2026#"
        });

    const freshToken = login.body.data.accessToken;

    const response = await request(app)
        .get("/api/v1/cleaner/all_Cleaners")
        .set("Authorization", `Bearer ${freshToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.message)
        .toBe("List of cleaners (cached)");

    expect(response.body.data).toEqual(cachedData);
});
    it("should return 400 for invalid sort field", async () => {

    const response = await request(app)
        .get("/api/v1/cleaner/all_Cleaners?sort=password")
        .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(400);

});

it("should ignore unsupported filters", async () => {

    const response = await request(app)
        .get("/api/v1/cleaner/all_Cleaners?salary=10000")
        .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

});

it("should ignore unsupported filters", async () => {

    const response = await request(app)
        .get("/api/v1/cleaner/all_Cleaners?salary=10000")
        .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

});

});