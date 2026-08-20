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
        .withMessage("Years of experience must be a non-negative integer"),

    body("clinicHours")
        .notEmpty()
        .withMessage("Clinic hours are required"),

    
];



export const updateDoctorValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid doctor ID"),

    body("specialization")
        .optional()
        .notEmpty()
        .withMessage("Specialization cannot be empty"),

    body("licenseNum")
        .optional()
        .notEmpty()
        .withMessage("License number cannot be empty"),

    body("yearsOfExperience")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Years of experience must be a non-negative integer"),

    body("consultingDay")
        .optional()
        .notEmpty()
        .withMessage("Consulting day cannot be empty"),

    body("clinicHours")
        .optional()
        .notEmpty()
        .withMessage("Clinic hours cannot be empty")
];