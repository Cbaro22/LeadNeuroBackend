import { ExpressValidator } from "express-validator";
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
        .normalizeEmail(),

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
        .isNumeric()
        .withMessage("Salary must be a number"),

    body("role")
        .isIn(["admin","doctor","nurse","cleaner"])
        .withMessage("Invalid role")
];