import { body } from "express-validator";

export const createCleanerValidator = [

    body("assignedArea")
        .notEmpty()
        .withMessage("Assigned area is required"),

    body("shift")
        .isIn(["Morning","Afternoon","Night"])
        .withMessage("Invalid shift"),

    body("staff")
        .isMongoId()
        .withMessage("Invalid Staff ID")
];