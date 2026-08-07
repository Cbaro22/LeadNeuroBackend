import { body } from "express-validator";

export const createDrugValidator = [

    body("genericName")
        .trim()
        .notEmpty()
        .withMessage("Generic name is required"),

    body("therapeuticClass")
        .trim()
        .notEmpty()
        .withMessage("Therapeutic class is required"),

    body("route")
        .trim()
        .notEmpty()
        .withMessage("Route of administration is required"),

    body("brandName")
        .trim()
        .notEmpty()
        .withMessage("Brand name is required"),

    body("manufacturer")
        .optional()
        .trim(),

    body("dosageForm")
        .trim()
        .notEmpty()
        .withMessage("Dosage form is required"),

    body("strength")
        .trim()
        .notEmpty()
        .withMessage("Strength is required"),

    body("nafdacNumber")
        .trim()
        .notEmpty()
        .withMessage("NAFDAC number is required"),

    body("indications")
        .optional()
        .isArray()
        .withMessage("Indications must be an array"),

    body("contraindications")
        .optional()
        .isArray()
        .withMessage("Contraindications must be an array"),

    body("sideEffects")
        .optional()
        .isArray()
        .withMessage("Side effects must be an array"),

    body("interactions")
        .optional()
        .isArray()
        .withMessage("Drug interactions must be an array"),

    body("prescriptionRequired")
        .optional()
        .isBoolean()
        .withMessage("Prescription required must be true or false"),

    body("costPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cost price must be a positive number"),

    body("sellingPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Selling price must be a positive number"),

    body("minimumStockLevel")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Minimum stock level must be a positive integer"),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be true or false"),
];