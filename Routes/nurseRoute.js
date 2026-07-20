import express from "express"
import {authentication, Authorization } from "../Middlewares/ValidateStaff.js"
import { handlecreateNurse, handledeleteNurse, handlegetAllNurses, handlegetNurseById, handleUpdateNurse } from "../Controllers/NurseCtrls.js"
import { validate } from "../Validators/validate.js"
import { createNurseValidator } from "../Validators/nurseValidator.js"
const router = express.Router()


/**
 * @swagger
 * /api/nurse/create_Nurse/{id}:
 *   post:
 *     summary: Create a nurse profile
 *     description: Creates a nurse profile for an existing staff member.
 *     tags:
 *       - Nurses
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ID
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNurseRequest'
 *
 *     responses:
 *       201:
 *         description: Nurse profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nurse data created successfully
 *                 nurse:
 *                   $ref: '#/components/schemas/CreateNurseResponse'
 *
 *       400:
 *         description: Validation error or nurse already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden
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
router.post('/create_Nurse/:id', createNurseValidator, validate, handlecreateNurse)

/**
 * @swagger
 * /api/nurse/get_Nurses:
 *   get:
 *     summary: Get all nurses
 *     description: Retrieves a list of all registered nurses.
 *     tags:
 *       - Nurses
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: List of nurses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllNursesResponse'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden
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

router.get('/get_Nurses',authentication, Authorization("admin"), handlegetAllNurses)

/**
 * @swagger
 * /api/nurse/get_Nurse/{id}:
 *   get:
 *     summary: Get nurse by Staff ID
 *     description: Retrieves a nurse profile using the associated Staff ID.
 *     tags:
 *       - Nurses
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ObjectId associated with the nurse.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Nurse retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetNurseResponse'
 *
 *       400:
 *         description: Invalid Staff ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Nurse not found
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

router.get('/get_Nurse/:id',authentication, Authorization("nurse", "admin"), handlegetNurseById)

/**
 * @swagger
 * /api/nurse/get_Nurses:
 *   get:
 *     summary: Get all nurses
 *     description: Retrieves a list of all registered nurses.
 *     tags:
 *       - Nurses
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: List of nurses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllNursesResponse'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden
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

router.put('/update_Nurse/:id',authentication, Authorization( "admin"), handleUpdateNurse)

/**
 * @swagger
 * /api/nurse/delete_Nurse/{id}:
 *   delete:
 *     summary: Delete a nurse profile
 *     description: Deletes a nurse profile using the associated Staff ID.
 *     tags:
 *       - Nurses
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ObjectId associated with the nurse.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Nurse deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteNurseResponse'
 *
 *       400:
 *         description: Invalid Staff ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Nurse not found
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

router.delete('/delete_Nurse/:id',authentication, Authorization( "admin"), handledeleteNurse)

export default router;