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
    .isNumeric()
    .withMessage("Years of experience must be a number"),
];