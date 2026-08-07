import dotenv from "dotenv";
import mongoose from "mongoose";
import dataBase from "../config/db.js";
import Staff from "../Models/Staff.js";

dotenv.config();

beforeAll(async () => {
    console.log("Before connect");
    await dataBase();
    console.log("After connect");
});

afterAll(async () => {
    await Staff.deleteMany({
        email: /@test\.com$/
    });

    console.log("Closing database");
    await mongoose.connection.close();
    console.log("Database closed");
});