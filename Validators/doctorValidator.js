import { body, param } from "express-validator";

export const createDoctorValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid Staff ID"),

    body("specialization")
        .notEmpty()
        .withMessage("Specialization is required"),

    body("licenseNum")
        .notEmpty()
        .withMessage("License number is required"),

    body("yearsOfExperience")
        .isInt({ min: 0 })
        .withMessage("Years of experience must be a positive integer"),

    body("clinicHours")
        .notEmpty()
        .withMessage("Clinic hours are required"),

    
];