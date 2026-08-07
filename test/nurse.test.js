
import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import Staff from "../Models/Staff.js";
import Nurse from "../Models/Nurse.js";

describe("Nurse Controller", () => {

    let token;
    let staffId;
    let nurseId;

    beforeAll(async () => {

        const login = await request(app)
            .post("/api/v1/staff/login")
            .send({
            email: "airdropclerk@gmail.com",
            password: "Meta2026#"
            });

        token = login.body.data.accessToken;

        const staff = await Staff.create({
            name: "Nurse Staff",
            email: "nursetest@gmail.com",
            password: "Password123!",
            phone: "08012345678",
            Address: "Benin",
            role: "nurse",
            department: "Nursing",
            salary: 90000
        });

        staffId = staff._id;
    });

    afterAll(async () => {
        await Nurse.deleteMany({});
        await Staff.deleteOne({ _id: staffId });
    });

    describe("Create Nurse", () => {

        it("should create nurse successfully", async () => {

            const res = await request(app)
                .post(`/api/v1/nurse/create_Nurse/${staffId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    certification: "RN",
                    wardAssigned: "Ward A",
                    shift: "Morning",
                    yearsOfExperience: 5,
                    licenseNum: "RN001",
                    supervisor: "Mrs Grace"
                });

            expect(res.statusCode).toBe(201);

            nurseId = res.body.data._id;
        });

        it("should return 400 when required fields are missing", async () => {

            const res = await request(app)
                .post(`/api/v1/nurse/create_Nurse/${staffId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({});

            expect(res.statusCode).toBe(400);
        });

        it("should return 400 for invalid staff id", async () => {

            const res = await request(app)
                .post("/api/v1/nurse/create_Nurse/123")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    certification: "RN",
                    wardAssigned: "Ward A",
                    shift: "Morning",
                    yearsOfExperience: 5,
                    licenseNum: "RN001",
                    supervisor: "Mrs Grace"
                });

            expect(res.statusCode).toBe(400);
        });

        it("should return 404 when staff does not exist", async () => {

            const fakeId = "66a67e1f7a205d443a3d17aa";

            const res = await request(app)
                .post(`/api/v1/nurse/create_Nurse/${fakeId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    certification: "RN",
                    wardAssigned: "Ward A",
                    shift: "Morning",
                    yearsOfExperience: 5,
                    licenseNum: "RN001",
                    supervisor: "Mrs Grace"
                });

            expect(res.statusCode).toBe(404);
        });

        it("should return 400 when nurse already exists", async () => {

            const res = await request(app)
                .post(`/api/v1/nurse/create_Nurse/${staffId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    certification: "RN",
                    wardAssigned: "Ward A",
                    shift: "Morning",
                    yearsOfExperience: 5,
                    licenseNum: "RN001",
                    supervisor: "Mrs Grace"
                });

            expect(res.statusCode).toBe(400);
        });

    });

    describe("Get Nurses", () => {

        it("should get all nurses", async () => {

            const res = await request(app)
                .get("/api/v1/nurse/get_Nurses")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
        });

        it("should paginate nurses", async () => {

            const res = await request(app)
                .get("/api/v1/nurse/get_Nurses?page=1&limit=5")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
        });

        it("should search nurses", async () => {

            const res = await request(app)
                .get("/api/v1/nurse/get_Nurses?search=Ward")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
        });

        it("should filter nurses", async () => {

            const res = await request(app)
                .get("/api/v1/nurse/get_Nurses?shift=Morning")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
        });

    });

    describe("Get Nurse By Id", () => {

        it("should get one nurse", async () => {

            const res = await request(app)
                .get(`/api/v1/nurse/get_Nurse/${staffId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
        });

        it("should return 400 for invalid id", async () => {

            const res = await request(app)
                .get("/api/v1/nurse/get_Nurse/123")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(400);
        });

        it("should return 404 when nurse does not exist", async () => {

    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
        .get(`/api/v1/nurse/get_Nurse/${fakeId}`)
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
});

    });

    describe("Update Nurse", () => {

        it("should update nurse successfully", async () => {

            const res = await request(app)
                .put(`/api/v1/nurse/update_Nurse/${staffId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    certification: "BscN",
                    wardAssigned: "Ward B",
                    shift: "Night",
                    yearsOfExperience: 8,
                    licenseNum: "RN002",
                    supervisor: "Mr John"
                });

expect(res.statusCode).toBe(200);
        });

                it("should return 400 for invalid nurse id", async () => {

    const res = await request(app)
        .put("/api/v1/nurse/update_Nurse/123")
        .set("Authorization", `Bearer ${token}`)
        .send({
            certification: "RN",
        wardAssigned: "Ward A",
        shift: "Morning"
        });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);

});

it("should return 404 when nurse does not exist", async () => {

    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
        .put(`/api/v1/nurse/update_Nurse/${fakeId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            certification: "RN",
        wardAssigned: "Ward A",
        shift: "Morning"
        });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);

});

it("should return 400 when validation fails", async () => {

    const res = await request(app)
        .put(`/api/v1/nurse/update_Nurse/${staffId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            certification: ""
        });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);

});

            

    });

    describe("Delete Nurse", () => {

        it("should delete nurse successfully", async () => {

            const res = await request(app)
                .delete(`/api/v1/nurse/delete_Nurse/${staffId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
        });

it("should return 400 for invalid nurse id", async () => {

    const res = await request(app)
        .delete("/api/v1/nurse/delete_Nurse/123")
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);

});


it("should return 404 when nurse does not exist", async () => {

    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
        .delete(`/api/v1/nurse/delete_Nurse/${fakeId}`)
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);

});
    });
it("should sort nurses", async () => {

    const res = await request(app)
        .get("/api/v1/nurse/get_Nurses?sort=yearsOfExperience")
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

});

it("should return selected nurse fields", async () => {

    const res = await request(app)
        .get("/api/v1/nurse/get_Nurses?fields=certification,shift")
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

});


});