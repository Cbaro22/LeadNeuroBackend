import { body, param } from "express-validator";

export const createNurseValidator = [

    body("certification")
        .isIn(["RN","LPN","CNA","BscN"])
        .withMessage("Invalid certification"),

    body("wardAssigned")
        .notEmpty()
        .withMessage("Ward is required"),

    body("shift")
        .isIn(["Morning","Afternoon","Night"])
        .withMessage("Invalid shift"),

    param("id")
        .isMongoId()
        .withMessage("Invalid Staff ID"),
    body("licenseNum")
       .notEmpty()
       .isString()
       .withMessage("license Number is required"),
    body("supervisor")
       .notEmpty()
       .withMessage("/supervisor is required"),
    body("yearsOfExperience")
    .isInt({ min: 0 })
    .withMessage("Years of experience must be a number"),
];

export const updateNurseValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Staff ID"),

    body("certification")
        .optional()
        .isIn(["RN", "LPN", "CNA", "BscN"])
        .withMessage("Invalid certification"),

    body("wardAssigned")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Ward is required"),

    body("shift")
        .optional()
        .isIn(["Morning", "Afternoon", "Night"])
        .withMessage("Invalid shift"),

    body("yearsOfExperience")
        .optional()
        .isNumeric()
        .withMessage("Years of experience must be a number"),

    body("licenseNum")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("License number is required"),

    body("supervisor")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Supervisor is required")
];

