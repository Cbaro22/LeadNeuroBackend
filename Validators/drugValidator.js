import { body } from "express-validator";

export const createDrugValidator = [

    body("genericName")
        .trim()
        .notEmpty()
        .withMessage("Generic name is required"),

    body("brandName")
        .trim()
        .notEmpty()
        .withMessage("Brand name is required"),

    body("therapeuticClass")
        .trim()
        .notEmpty()
        .withMessage("Therapeutic class is required"),

    body("manufacturer")
        .trim()
        .notEmpty()
        .withMessage("Manufacturer is required"),

    body("dosageForm")
        .trim()
        .notEmpty()
        .withMessage("Dosage form is required"),

    body("strength")
        .trim()
        .notEmpty()
        .withMessage("Strength is required"),

    body("route")
        .trim()
        .notEmpty()
        .withMessage("Route of administration is required"),

    body("indications")
        .trim()
        .notEmpty()
        .withMessage("Indications are required"),

    body("contraindications")
        .trim()
        .notEmpty()
        .withMessage("Contraindications are required"),

    body("sideEffects")
        .trim()
        .notEmpty()
        .withMessage("Side effects are required"),

    body("interactions")
        .trim()
        .notEmpty()
        .withMessage("Drug interactions are required"),

    body("nafdacNumber")
        .trim()
        .notEmpty()
        .withMessage("NAFDAC number is required")
];