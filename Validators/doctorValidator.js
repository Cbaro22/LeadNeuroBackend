import { body } from "express-validator";

export const createDoctorValidator = [

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

    body("staff")
        .isMongoId()
        .withMessage("Invalid Staff ID")
];