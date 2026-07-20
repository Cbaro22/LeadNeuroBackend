import express from "express"
import {authentication,  Authorization } from "../Middlewares/ValidateStaff.js"
import { handlecreatecleaner, handledeleteCleaner, handlegetAllCleaners, handlegetCleanerById, handleupdateCleaner } from "../Controllers/CleanerCtrls.js"
    import { createCleanerValidator } from "../Validators/cleanerValidator.js";
import { validate } from "../Validators/validate.js";

const router = express.Router()

/**
 * @swagger
 * /api/cleaner/create_Cleaner/{id}:
 *   post:
 *     summary: Create a cleaner profile
 *     description: Creates a cleaner profile for an existing staff member.
 *     tags:
 *       - Cleaners
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ObjectId associated with the cleaner.
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCleanerRequest'
 *
 *     responses:
 *       201:
 *         description: Cleaner profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCleanerResponse'
 *
 *       400:
 *         description: Validation error or cleaner already exists
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

router.post('/create_Cleaner/:id', createCleanerValidator, validate, handlecreatecleaner)

/**
 * @swagger
 * /api/cleaner/all_Cleaners:
 *   get:
 *     summary: Get all cleaners
 *     description: Retrieves a list of all registered cleaners.
 *     tags:
 *       - Cleaners
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: List of cleaners retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllCleanersResponse'
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

router.get('/all_Cleaners', authentication,Authorization("admin"), handlegetAllCleaners)

/**
 * @swagger
 * /api/cleaner/one_Cleaner/{id}:
 *   get:
 *     summary: Get cleaner by Staff ID
 *     description: Retrieves a cleaner profile using the associated Staff ID.
 *     tags:
 *       - Cleaners
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ObjectId associated with the cleaner.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Cleaner retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCleanerResponse'
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
 *         description: Cleaner not found
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

router.get('/one_Cleaner/:id',authentication,Authorization("cleaner", "admin"), handlegetCleanerById)

/**
 * @swagger
 * /api/cleaner/update_Cleaner/{id}:
 *   put:
 *     summary: Update a cleaner profile
 *     description: Updates an existing cleaner profile using the associated Staff ID.
 *     tags:
 *       - Cleaners
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ObjectId associated with the cleaner.
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCleanerRequest'
 *
 *     responses:
 *       200:
 *         description: Cleaner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCleanerResponse'
 *
 *       400:
 *         description: Invalid request or validation error
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
 *         description: Cleaner not found
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

router.put('/update_Cleaner/:id',authentication, Authorization( "admin"), handleupdateCleaner)

/**
 * @swagger
 * /api/cleaner/delete_Cleaner/{id}:
 *   delete:
 *     summary: Delete a cleaner profile
 *     description: Deletes a cleaner profile using the associated Staff ID.
 *     tags:
 *       - Cleaners
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ObjectId associated with the cleaner.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Cleaner deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteCleanerResponse'
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
 *         description: Cleaner not found
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

router.delete('/delete_Cleaner/:id',authentication,Authorization("admin"), handledeleteCleaner)

export default router;