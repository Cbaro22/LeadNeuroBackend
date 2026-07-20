import express from "express"
import { Authorization } from "../Middlewares/ValidateStaff.js"
import { authentication } from "../Middlewares/ValidateStaff.js"
import { handleCreateStaff, handleLoginStaff, handleGetAllStaff, handleForgotPassword, handleGetStaffById, handleResetPassword, handleUpdateStaff, handleDeleteStaff } from "../Controllers/staffCtrls.js"
import { validate } from "../Validators/validate.js"
import { createStaffValidator } from "../Validators/staffValidator.js"

 const router = express.Router()

 /**
 * @swagger
 * /api/staff/register:
 *   post:
 *     summary: Register a new staff member
 *     description: |
 *       Creates a new staff account in the Lead Neuro Backend system.
 *
 *       This endpoint is used to register doctors, nurses, cleaners and administrators.
 *
 *       The email address must be unique.
 *
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *               phone:
 *                 type: string
 *                 example: 08012345678
 *               address:
 *                 type: string
 *                 example: Lagos
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - doctor
 *                   - nurse
 *                   - cleaner
 *               department:
 *                 type: string
 *                 example: Neurology
 *               salary:
 *                 type: number
 *                 example: 250000
 *     responses:
 *       201:
 *         description: Staff registered successfully.
 *
 *       400:
 *         description: Validation error.
 *
 *       409:
 *         description: Email already exists.
 */
router.post('/register',createStaffValidator,validate, handleCreateStaff)

/**
 * @swagger
 * /api/staff/login:
 *   post:
 *     summary: Authenticate a staff member
 *     description: Logs in a registered staff member using email and password and returns JWT access and refresh tokens.
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
 *         description: Missing email or password
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
router.post('/login', handleLoginStaff)

/**
 * @swagger
 * /api/staff/all_Staff:
 *   get:
 *     summary: Retrieve all staff members
 *     description: Returns a list of all staff members. Only administrators can access this endpoint.
 *     tags:
 *       - Staff
 *
 *     security:
 *       - bearerAuth: []
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
router.get('/all_Staff',authentication, Authorization("admin"),handleGetAllStaff)

/**
 * @swagger
 * /api/staff/Forgot_password:
 *   post:
 *     summary: Request a password reset
 *     description: Generates a password reset token and sends a password reset email to the registered staff email address.
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
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponse'
 *
 *       400:
 *         description: Invalid request
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
router.post('/Forgot_password', handleForgotPassword)


/**
 * @swagger
 * /api/staff/one_Staff/{id}:
 *   get:
 *     summary: Retrieve a staff member by ID
 *     description: Retrieves a single staff member and any associated role-specific information (Doctor, Nurse, or Cleaner). Only administrators can access this endpoint.
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
 *         description: MongoDB ObjectId of the staff member
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
router.get('/one_Staff/:id',authentication, Authorization("admin"), handleGetStaffById)

/**
 * @swagger
 * /api/staff/reset_password:
 *   patch:
 *     summary: Reset a staff password
 *     description: Resets a staff member's password using the email address, password reset token, and a new password.
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
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
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

router.patch('/reset_password', handleResetPassword)

/**
 * @swagger
 * /api/staff/update/{id}:
 *   put:
 *     summary: Update a staff member
 *     description: Updates the details of an existing staff member. Only administrators can perform this operation.
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
 *         description: MongoDB ObjectId of the staff member
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
router.put('/update/:id', authentication, Authorization("admin"),  handleUpdateStaff)

/**
 * @swagger
 * /api/staff/delete/{id}:
 *   delete:
 *     summary: Delete a staff member
 *     description: Deletes a staff member from the system and sends a notification email. Only administrators can perform this operation.
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
 *         description: MongoDB ObjectId of the staff member
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
 *               $ref: '#/components/schemas/DeleteResponse'
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
router.delete('/delete/:id',authentication, Authorization("admin"), handleDeleteStaff)
    
export default router;





