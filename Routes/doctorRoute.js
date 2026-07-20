import express from 'express'
import {   authentication, Authorization } from '../Middlewares/ValidateStaff.js'
import { handlecreateDoctor, handledeleteDoctor, handlegetAllDoctors, handlegetDoctorById, handleupdatedoctor } from '../Controllers/DoctorCtrls.js'
import { validate } from '../Validators/validate.js'
import { createDoctorValidator } from '../Validators/doctorValidator.js'

const router = express.Router()


/**
 * @swagger
 * /api/doctor/create_Doctor/{id}:
 *   post:
 *     summary: Create doctor profile
 *     description: Creates a doctor profile for an existing staff member. Only administrators can perform this operation.
 *     tags:
 *       - Doctor
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
 *             $ref: '#/components/schemas/CreateDoctorRequest'
 *
 *     responses:
 *       201:
 *         description: Doctor profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDoctorResponse'
 *
 *       400:
 *         description: Invalid request, validation failed, or doctor already exists
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
router.post('/create_Doctor/:id',authentication, createDoctorValidator, validate, handlecreateDoctor)

/**
 * @swagger
 * /api/doctor/get_Doctors:
 *   get:
 *     summary: Retrieve all doctors
 *     description: Returns a list of all registered doctors along with their associated staff information. Only administrators can access this endpoint.
 *     tags:
 *       - Doctor
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Doctors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllDoctorsResponse'
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

router.get('/get_Doctors',authentication,Authorization("admin"), handlegetAllDoctors)

/**
 * @swagger
 * /api/doctor/get_Doctor/{id}:
 *   get:
 *     summary: Retrieve a doctor by ID
 *     description: Retrieves a single doctor's profile, including the associated staff information. Accessible by administrators and doctors.
 *     tags:
 *       - Doctor
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the doctor
 *         schema:
 *           type: string
 *           example: "686f6b8d2b45d12e85d88d1a"
 *
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetDoctorByIdResponse'
 *
 *       400:
 *         description: Invalid doctor ID
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
 *         description: Forbidden - Admin or Doctor access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Doctor not found
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

router.get('/get_Doctor/:id',authentication,Authorization("admin", "doctor"), handlegetDoctorById)

/**
 * @swagger
 * /api/doctor/delete_Doctor/{id}:
 *   delete:
 *     summary: Delete a doctor profile
 *     description: Deletes a doctor's profile from the system. Only administrators can perform this operation.
 *     tags:
 *       - Doctor
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the doctor
 *         schema:
 *           type: string
 *           example: "686f6b8d2b45d12e85d88d1a"
 *
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *
 *       400:
 *         description: Invalid doctor ID
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
 *         description: Doctor not found
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

router.delete('/delete_Doctor/:id',authentication,Authorization("admin"), handledeleteDoctor)

/**
 * @swagger
 * /api/doctor/update_Doctor/{id}:
 *   put:
 *     summary: Update a doctor's profile
 *     description: Updates an existing doctor's profile. Only administrators can perform this operation.
 *     tags:
 *       - Doctor
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the doctor
 *         schema:
 *           type: string
 *           example: "686f6b8d2b45d12e85d88d1a"
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDoctorRequest'
 *
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateDoctorResponse'
 *
 *       400:
 *         description: Invalid doctor ID or validation error
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
 *         description: Doctor not found
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

router.put('/update_Doctor/:id',authentication,Authorization("admin"), handleupdatedoctor)

export default router;