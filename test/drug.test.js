import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import Drug from "../Models/Drugs.js";
import { uniqueDrugData } from "./helpers/drug.test.helper.js";
import { uniqueValue } from "./helpers/drug.test.helper.js";

let token;
let drugId;

beforeAll(async () => {
    await Drug.deleteMany({});
    const login = await request(app)
        .post("/api/v1/staff/login")
        .send({
            email: "airdropclerk@gmail.com",
            password: "Meta2026#"
        });

    token = login.body.data.accessToken;
});
describe("Create Drug", () => {

    it("should create a drug successfully", async () => {

        const res = await request(app)
            .post("/api/v1/drug/create_Drug")
            .set("Authorization", `Bearer ${token}`)
            .send({
                genericName: "Paracetamol",
                therapeuticClass: "Analgesic",
                indications: ["Pain", "Fever"],
                contraindications: ["Liver disease"],
                sideEffects: ["Nausea"],
                interactions: ["Alcohol"],
                route: "Oral",
                brandName: "Panadol",
                manufacturer: "GSK",
                dosageForm: "Tablet",
                strength: "500mg",
                nafdacNumber: "04-1234",
                prescriptionRequired: false,
                costPrice: 200,
                sellingPrice: 350,
                minimumStockLevel: 10,
                isActive: true
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Drug created successfully");

        drugId = res.body.data._id;
    });

    it("should return 400 when required fields are missing", async () => {
    const drug = uniqueDrugData();

    delete drug.genericName;
    delete drug.brandName;
    delete drug.route;

    const res = await request(app)
        .post("/api/v1/drug/create_Drug")
        .set("Authorization", `Bearer ${token}`)
        .send(drug);

    expect(res.statusCode).toBe(400);
});

    it("should return 400 when drug already exists", async () => {

        const res = await request(app)
            .post("/api/v1/drug/create_Drug")
            .set("Authorization", `Bearer ${token}`)
            .send({
                genericName: "Paracetamol",
                therapeuticClass: "Analgesic",
                indications: ["Pain", "Fever"],
                contraindications: ["Liver disease"],
                sideEffects: ["Nausea"],
                interactions: ["Alcohol"],
                route: "Oral",
                brandName: "Panadol",
                manufacturer: "GSK",
                dosageForm: "Tablet",
                strength: "500mg",
                nafdacNumber: "04-9999",
                prescriptionRequired: false,
                costPrice: 200,
                sellingPrice: 350,
                minimumStockLevel: 10,
                isActive: true
            });

        expect(res.statusCode).toBe(400);
    });

    describe("Get All Drugs", () => {

    it("should get all drugs", async () => {

        const res = await request(app)
            .get("/api/v1/drug/all_Drugs")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    it("should paginate drugs", async () => {

        const res = await request(app)
            .get("/api/v1/drug/all_Drugs?page=1&limit=5")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    it("should search drugs", async () => {

        const res = await request(app)
            .get("/api/v1/drug/all_Drugs?search=Para")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    it("should filter drugs", async () => {

        const res = await request(app)
            .get("/api/v1/drug/all_Drugs?brandName=Panadol")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    it("should sort drugs", async () => {

        const res = await request(app)
            .get("/api/v1/drug/all_Drugs?sort=genericName")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    it("should return selected fields", async () => {

        const res = await request(app)
            .get("/api/v1/drug/all_Drugs?fields=genericName,brandName")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

});

describe("Get Drug By ID", () => {

    it("should get one drug successfully", async () => {

        const res = await request(app)
            .get(`/api/v1/drug/one_Drug/${drugId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Drug retrieved successfully");
        expect(res.body.data._id).toBe(drugId);
    });

    it("should return 400 for invalid drug id", async () => {

        const res = await request(app)
            .get("/api/v1/drug/one_Drug/123")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Invalid drug ID");
    });

    it("should return 404 when drug does not exist", async () => {

        const fakeId = new mongoose.Types.ObjectId();

        const res = await request(app)
            .get(`/api/v1/drug/one_Drug/${fakeId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Drug not found");
    });

});

describe("Search Drugs", () => {

    it("should search drug by generic name", async () => {

        const res = await request(app)
            .get("/api/v1/drug/search?genericName=Para")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Drugs retrieved successfully");
        expect(res.body.data.count).toBeGreaterThan(0);
    });

    it("should search drug by brand name", async () => {

        const res = await request(app)
            .get("/api/v1/drug/search?brandName=Panadol")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Drugs retrieved successfully");
        expect(res.body.data.count).toBeGreaterThan(0);
    });

    it("should search drug by brand and generic name", async () => {

        const res = await request(app)
            .get("/api/v1/drug/search?brandName=Panadol&genericName=Para")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Drugs retrieved successfully");
        expect(res.body.data.count).toBeGreaterThan(0);
    });

    it("should return 400 when no search parameter is provided", async () => {

        const res = await request(app)
            .get("/api/v1/drug/search")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Brand name or generic name is required");
    });

});

describe("Update Drug", () => {
it("should update a drug successfully", async () => {

    const updateData = {
        sellingPrice: 2500,
        costPrice: 1800,
        manufacturer: "GSK Nigeria",
        strength: "650mg"
    };

    const res = await request(app)
        .put(`/api/v1/drug/update_Drug/${drugId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Drug updated successfully");

    expect(res.body.data.sellingPrice).toBe(2500);
    expect(res.body.data.costPrice).toBe(1800);
    expect(res.body.data.manufacturer).toBe("GSK Nigeria");
    expect(res.body.data.strength).toBe("650mg");
});
it("should return 400 for invalid drug id", async () => {

    const res = await request(app)
        .put("/api/v1/drug/update_Drug/123")
        .set("Authorization", `Bearer ${token}`)
        .send({
            sellingPrice: 3000
        });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid drug ID");

});
it("should return 404 when drug does not exist", async () => {

    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
        .put(`/api/v1/drug/update_Drug/${fakeId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            sellingPrice: 3000
        });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Drug not found");

});

describe("Delete Drug", () => {

    it("should delete a drug successfully", async () => {

        const res = await request(app)
            .delete(`/api/v1/drug/delete_Drug/${drugId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Drug deleted successfully");
    });

    it("should return 400 for invalid drug id", async () => {

        const res = await request(app)
            .delete("/api/v1/drug/delete_Drug/123")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Invalid drug ID");
    });

    it("should return 404 when drug does not exist", async () => {

        const fakeId = new mongoose.Types.ObjectId();

        const res = await request(app)
            .delete(`/api/v1/drug/delete_Drug/${fakeId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Drug not found");
    });

});

});
});