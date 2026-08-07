import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import Staff from "../Models/Staff.js";

let testEmail;
let testPassword;

beforeAll(async () => {
    testEmail = `auth${Date.now()}@test.com`;
    testPassword = "Meta2026#";

    await request(app)
        .post("/api/v1/staff/register")
        .send({
            name: "Authentication Test",
            email: testEmail,
            password: testPassword,
            phone: "08012345678",
            Address: "Test Address",
            role: "cleaner",
            department: "Cleaning",
            salary: 50000
        });
});




describe("Authentication", () => {

    test("should login successfully with valid credentials", async () => {

    const response = await request(app)
        .post("/api/v1/staff/login")
        .send({
            email: "airdropclerk@gmail.com",
            password: "Meta2026#"
        });

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message)
        .toBe("Login successful");

    expect(response.body.data).toHaveProperty("staff");

    expect(response.body.data).toHaveProperty("accessToken");

    expect(response.body.data).toHaveProperty("refreshToken");

});

test("should return 400 when email and password are missing", async () => {

    const response = await request(app)
        .post("/api/v1/staff/login")
        .send({});

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message)
        .toBe("All fields are required");

});

test("should return 404 for non-existing account", async () => {

    const response = await request(app)
        .post("/api/v1/staff/login")
        .send({
            email: "kobrynclerk@gmail.com",
            password: "Meta2026#"
        });

    expect(response.statusCode).toBe(404);

    expect(response.body.success).toBe(false);

    expect(response.body.message)
        .toBe("Account not found");

});

test("should return 401 for incorrect password", async () => {

    const response = await request(app)
        .post("/api/v1/staff/login")
        .send({
            email: "airdropclerk@gmail.com",
            password: "Meta2028#"
        });

    expect(response.statusCode).toBe(401);

    expect(response.body.success).toBe(false);

    expect(response.body.message)
        .toBe("Incorrect email or password");

});

});

describe("Login", () => {

    test("should login successfully with valid credentials", async () => {

        const response = await request(app)
            .post("/api/v1/staff/login")
            .send({
                email: testEmail,
                password: testPassword
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Login successful");

        expect(response.body.data).toHaveProperty("staff");
        expect(response.body.data).toHaveProperty("accessToken");
        expect(response.body.data).toHaveProperty("refreshToken");

    });

});

describe("Forgot Password", () => {

    test("should send password reset email successfully", async () => {

        const response = await request(app)
            .post("/api/v1/staff/Forgot_password")
            .send({
                email: testEmail
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Password reset email sent");

        expect(response.body.data).toHaveProperty("resetToken");

    });

});

describe("Reset Password", () => {

    test("should reset password successfully", async () => {

        // Generate a reset token first
        const forgot = await request(app)
            .post("/api/v1/staff/Forgot_password")
            .send({
                email: testEmail
            });

        const token = forgot.body.data.resetToken;

        // Reset the password
        const response = await request(app)
            .patch("/api/v1/staff/reset_password")
            .send({
                email: testEmail,
                token,
                password: "NewPassword2026#"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message)
            .toBe("Password reset successful");

        // Update the password variable so subsequent login tests use it
        testPassword = "NewPassword2026#";

    });

});

