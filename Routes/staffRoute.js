import express from "express"
import { Authorization } from "../Middlewares/ValidateStaff.js"
import { authentication } from "../Middlewares/ValidateStaff.js"
import { handleCreateStaff, handleLoginStaff, handleGetAllStaff, handleForgotPassword, handleGetStaffById, handleResetPassword, handleUpdateStaff, handleDeleteStaff } from "../Controllers/staffCtrls.js"
import { validate } from "../Validators/validate.js"
import { createStaffValidator, updateStaffValidator } from "../Validators/staffValidator.js"
import { authLimiter } from "../Middlewares/authLimiter.js"
import { passwordLimiter } from "../Middlewares/passwordLimiter.js"

 const router = express.Router()

 /**
 * @swagger
 * /staff/register:
 *   post:
 *     summary: Register a new staff member
 *     description: |
 *       Creates a new staff account in the Lead Neuro Backend system.
 *
 *       Staff can be registered with one of the following roles:
 *       admin, doctor, nurse, or cleaner.
 *
 *       The email address must be unique.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStaffRequest'
 *
 *     responses:
 *       201:
 *         description: Staff created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStaffResponse'
 *
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       409:
 *         description: Staff account already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    '/register',
    createStaffValidator,
    validate,
    handleCreateStaff
);


/**
 * @swagger
 * /staff/login:
 *   post:
 *     summary: Authenticate a staff member
 *     description: |
 *       Authenticates a registered staff member using their email
 *       and password and returns access and refresh JWT tokens.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *
 *       400:
 *         description: Email and password are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Staff account not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    '/login',
    authLimiter,
    handleLoginStaff
);


/**
 * @swagger
 * /staff/all_Staff:
 *   get:
 *     summary: Retrieve all staff members
 *     description: |
 *       Retrieves a paginated list of staff members.
 *       Only administrators can access this endpoint.
 *
 *       Supports filtering, searching, sorting, field selection,
 *       and pagination through query parameters.
 *     tags:
 *       - Staff
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number.
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of staff records per page.
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, email, or department.
 *
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter staff by name.
 *
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter staff by department.
 *
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum:
 *             - admin
 *             - doctor
 *             - nurse
 *             - cleaner
 *         description: Filter staff by role.
 *
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to return.
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: |
 *           Sort fields. Supported fields include:
 *           name, email, department, salary, role,
 *           createdAt, and dateEmployed.
 *
 *     responses:
 *       200:
 *         description: Staff retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllStaffResponse'
 *
 *       401:
 *         description: Unauthorized - Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    '/all_Staff',
    authentication,
    Authorization("admin"),
    handleGetAllStaff
);


/**
 * @swagger
 * /staff/Forgot_password:
 *   post:
 *     summary: Request a password reset
 *     description: |
 *       Generates a password reset token for the staff member
 *       and sends a password reset email to the registered email address.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponse'
 *
 *       404:
 *         description: Staff account not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    '/Forgot_password',
    passwordLimiter,
    handleForgotPassword
);


/**
 * @swagger
 * /staff/one_Staff/{id}:
 *   get:
 *     summary: Retrieve a staff member by ID
 *     description: |
 *       Retrieves a single staff member using the MongoDB ObjectId.
 *       Only administrators can access this endpoint.
 *     tags:
 *       - Staff
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the staff member.
 *         schema:
 *           type: string
 *           example: "686f6b8d2b45d12e85d88d1a"
 *
 *     responses:
 *       200:
 *         description: Staff retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetStaffByIdResponse'
 *
 *       400:
 *         description: Invalid staff ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized - Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Staff not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    '/one_Staff/:id',
    authentication,
    Authorization("admin"),
    handleGetStaffById
);


/**
 * @swagger
 * /staff/reset_password:
 *   patch:
 *     summary: Reset a staff password
 *     description: |
 *       Resets a staff member's password using the email address,
 *       password reset token, and new password.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordResponse'
 *
 *       404:
 *         description: Invalid or expired reset token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch(
    '/reset_password',
    handleResetPassword
);


/**
 * @swagger
 * /staff/update/{id}:
 *   put:
 *     summary: Update a staff member
 *     description: |
 *       Updates an existing staff member.
 *       Only administrators can perform this operation.
 *
 *       Only the fields accepted by the Staff update validator
 *       can be updated.
 *     tags:
 *       - Staff
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the staff member.
 *         schema:
 *           type: string
 *           example: "686f6b8d2b45d12e85d88d1a"
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStaffRequest'
 *
 *     responses:
 *       200:
 *         description: Staff updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateStaffResponse'
 *
 *       400:
 *         description: Invalid staff ID or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized - Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Staff not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
    '/update/:id',
    authentication,
    Authorization("admin"),
    updateStaffValidator,
    validate,
    handleUpdateStaff
);


/**
 * @swagger
 * /staff/delete/{id}:
 *   delete:
 *     summary: Delete a staff member
 *     description: |
 *       Permanently deletes a staff member from the system.
 *       A notification email is sent to the deleted staff member.
 *       Only administrators can perform this operation.
 *     tags:
 *       - Staff
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the staff member.
 *         schema:
 *           type: string
 *           example: "686f6b8d2b45d12e85d88d1a"
 *
 *     responses:
 *       200:
 *         description: Staff deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteStaffResponse'
 *
 *       400:
 *         description: Invalid staff ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized - Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Staff not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
    '/delete/:id',
    authentication,
    Authorization("admin"),
    handleDeleteStaff
);
export default router;





