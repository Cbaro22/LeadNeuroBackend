import { body } from "express-validator";

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

    body("staff")
        .isMongoId()
        .withMessage("Invalid Staff ID")
];