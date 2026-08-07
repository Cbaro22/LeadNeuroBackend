import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Staff from "../Models/Staff.js";
import Doctor from "../Models/Doctor.js";

describe("Doctor Controller", () => {
    let token;
    let staffId;
    let doctorId;

    beforeAll(async () => {
        // Login as admin
        const login = await request(app)
            .post("/api/v1/staff/login")
            .send({
                email: "airdropclerk@gmail.com",
            password: "Meta2026#"
            }, 600000);

        console.log(login.statusCode);
console.log(login.body);

expect(login.statusCode).toBe(200);

token = login.body.data.accessToken;


        const staff = await Staff.create({
            name: "Doctor Test Staff",
            email: `doctor${Date.now()}@gmail.com`,
            password: "$2b$10$7M4QW1aS.5B9x7A8Q2YBfON4wukv2w9rBvUdVvZQmM5u1VYxW3wGi", // hashed password
            phone: "08012345678",
            address: "Benin",
            role: "doctor",
            department: "Neurology",
            salary: 250000
        });

        staffId = staff._id;
    });

    afterAll(async () => {
        await Doctor.deleteMany({
            staff: staffId
        });

        await Staff.findByIdAndDelete(staffId);

    });

    describe("Create Doctor", () => {

        it("should create doctor successfully", async () => {

           
            const response = await request(app)
                .post(`/api/v1/doctor/create_Doctor/${staffId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    specialization: "Neurologist",
                    yearsOfExperience: 5,
                    clinicHours: "8am - 4pm",
                    consultingDay: "Monday",
                    licenseNum: "DOC12345"
                });
 
                console.log(response.body);
            expect(response.statusCode).toBe(201);
            expect(response.body.success).toBe(true);

            doctorId = response.body.data._id;
        });

        it("should return 400 when required fields are missing", async () => {

            const response = await request(app)
                .post(`/api/v1/doctor/create_Doctor/${staffId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({});

            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it("should return 400 for invalid staff id", async () => {

            const response = await request(app)
                .post("/api/v1/doctor/create_Doctor/123")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    specialization: "Cardiology",
                    yearsOfExperience: 6,
                    clinicHours: "8-5",
                    consultingDay: "Tuesday",
                    licenseNum: "ABC123"
                });

            expect(response.statusCode).toBe(400);
        });

        it("should return 404 when staff does not exist", async () => {

            const fakeId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .post(`/api/v1/doctor/create_Doctor/${fakeId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    specialization: "Cardiology",
                    yearsOfExperience: 6,
                    clinicHours: "8-5",
                    consultingDay: "Tuesday",
                    licenseNum: "ABC123"
                });

            expect(response.statusCode).toBe(404);
        });

        it("should return 409 when doctor already exists", async () => {

            const response = await request(app)
                .post(`/api/v1/doctor/create_Doctor/${staffId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    specialization: "Neurologist",
                    yearsOfExperience: 5,
                    clinicHours: "8am - 4pm",
                    consultingDay: "Monday",
                    licenseNum: "DOC12345"
                });

            expect(response.statusCode).toBe(409);
        });

    });

    describe("Get Doctors", () => {

        it("should get all doctors", async () => {

            const response = await request(app)
                .get("/api/v1/doctor/get_Doctors")
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it("should paginate doctors", async () => {

            const response = await request(app)
                .get("/api/v1/doctor/get_Doctors?page=1&limit=5")
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });

        it("should search doctors", async () => {

            const response = await request(app)
                .get("/api/v1/doctor/get_Doctors?search=Neuro")
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });

        it("should filter doctors", async () => {

            const response = await request(app)
                .get("/api/v1/doctor/get_Doctors?specialization=Neurologist")
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });

    });

    describe("Get Doctor By Id", () => {

        it("should get one doctor", async () => {

            const response = await request(app)
                .get(`/api/v1/doctor/get_Doctor/${doctorId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });

        it("should return 400 for invalid id", async () => {

            const response = await request(app)
                .get("/api/v1/doctor/get_Doctor/123")
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(400);
        });

    });

    describe("Update Doctor", () => {

        it("should update doctor successfully", async () => {

            const response = await request(app)
                .put(`/api/v1/doctor/update_Doctor/${doctorId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    specialization: "Neurosurgeon",
                    yearsOfExperience: 10,
                    clinicHours: "9am - 5pm",
                    consultingDay: "Friday",
                    licenseNum: "NEW123"
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it("should return 400 for invalid doctor id", async () => {
    const response = await request(app)
        .put("/api/v1/doctor/update_Doctor/123")
        .set("Authorization", `Bearer ${token}`)
        .send({
            specialization: "Neurologist"
        });

    expect(response.statusCode).toBe(400);
});

it("should return 404 when doctor does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
        .put(`/api/v1/doctor/update_Doctor/${fakeId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            specialization: "Neurologist"
        });

    expect(response.statusCode).toBe(404);
});

    });

    describe("Delete Doctor", () => {

        it("should delete doctor successfully", async () => {

            const response = await request(app)
                .delete(`/api/v1/doctor/delete_Doctor/${doctorId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it("should return 404 when doctor does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
        .get(`/api/v1/doctor/get_Doctor/${fakeId}`)
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});

it("should return 400 for invalid doctor id", async () => {
    const response = await request(app)
        .delete("/api/v1/doctor/delete_Doctor/123")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
});

it("should return 404 when doctor does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
        .put(`/api/v1/doctor/update_Doctor/${fakeId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            specialization: "Neurologist"
        });

    expect(response.statusCode).toBe(404);
});
    });

});