
import { body } from "express-validator";

export const createStaffValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail()
        .isString(),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/)
        .withMessage("Password must contain an uppercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain a number"),

    body("phone")
        .notEmpty()
        .withMessage("Phone number is required"),

    body("Address")
        .notEmpty()
        .withMessage("Address is required"),

    body("department")
        .notEmpty()
        .withMessage("Department is required"),

    body("salary")
    .isFloat({ min: 0 })
    .withMessage("Salary must be a non-negative number"),

    body("role")
        .isIn(["admin","doctor","nurse","cleaner"])
        .withMessage("Invalid role")
];


export const updateStaffValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("phone")
        .optional()
        .trim(),

    body("Address")
        .optional()
        .trim(),

    body("department")
        .optional()
        .trim(),

    body("role")
        .optional()
        .isIn(["admin", "doctor", "nurse", "cleaner"])
        .withMessage("Invalid role"),

    body("salary")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Salary must be a non-negative number")
];