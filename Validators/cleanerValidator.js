import { body, param } from "express-validator";

export const createCleanerValidator = [

    param("staff_id")
        .isMongoId()
        .withMessage("Invalid Staff ID"),

    body("areaAssigned")
        .notEmpty()
        .withMessage("Assigned area is required"),

    body("shift")
        .isIn(["Morning", "Afternoon", "Night"])
        .withMessage("Invalid shift"),

    body("supervisor")
        .notEmpty()
        .withMessage("Supervisor is required"),

    body("workSchedule")
        .notEmpty()
        .withMessage("Work schedule is required"),
];

export const updateCleanerValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Staff ID"),

    body("areaAssigned")
        .optional()
        .notEmpty()
        .withMessage("Assigned area cannot be empty"),

    body("shift")
        .optional()
        .isIn(["Morning", "Afternoon", "Night"])
        .withMessage("Invalid shift"),

    body("supervisor")
        .optional()
        .notEmpty()
        .withMessage("Supervisor cannot be empty"),

    body("workSchedule")
        .optional()
        .notEmpty()
        .withMessage("Work schedule cannot be empty"),
];