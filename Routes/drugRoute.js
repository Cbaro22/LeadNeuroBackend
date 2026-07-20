import express from "express"
import { authentication, Authorization } from "../Middlewares/ValidateStaff.js"
import { handleCreateDrug, handleDeleteDrug, handleGetAllDrugs, handleGetDrugById, handleGetDrugsByBrandAndGenericName, handleUpdateDrug } from "../Controllers/DrugCtrls.js"
import { validate } from "../Validators/validate.js"
import { createDrugValidator } from "../Validators/drugValidator.js"

const router = express.Router()

/**
 * @swagger
 * /api/drug/create_Drug:
 *   post:
 *     summary: Create a new drug
 *     description: Creates a new drug record in the system.
 *     tags:
 *       - Drugs
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDrugRequest'
 *
 *     responses:
 *       201:
 *         description: Drug created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDrugResponse'
 *
 *       400:
 *         description: Validation error or duplicate drug
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post('/create_Drug',authentication, Authorization("admin"), createDrugValidator, validate, handleCreateDrug)

/**
 * @swagger
 * /api/drug/all_Drugs:
 *   get:
 *     summary: Get all drugs
 *     description: Retrieves a list of all drugs available in the system.
 *     tags:
 *       - Drugs
 *
 *     responses:
 *       200:
 *         description: List of drugs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllDrugsResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/all_Drugs',authentication,Authorization("admin", "doctor", "nurse"), handleGetAllDrugs)


/**
 * @swagger
 * /api/drug/one_Drug/{id}:
 *   get:
 *     summary: Get a drug by ID
 *     description: Retrieves a single drug using its MongoDB ObjectId.
 *     tags:
 *       - Drugs
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the drug.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Drug retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetDrugResponse'
 *
 *       400:
 *         description: Invalid drug ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Drug not found
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
router.get('/one_Drug/:id', handleGetDrugById)

/**
 * @swagger
 * /api/drug/update_Drug/{id}:
 *   put:
 *     summary: Update a drug
 *     description: Updates an existing drug using its MongoDB ObjectId.
 *     tags:
 *       - Drugs
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the drug.
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDrugRequest'
 *
 *     responses:
 *       200:
 *         description: Drug updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateDrugResponse'
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
 *         description: Drug not found
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

router.put('/update_Drug/:id',authentication,Authorization("admin"), handleUpdateDrug)

/**
 * @swagger
 * /api/drug/delete_Drug/{id}:
 *   delete:
 *     summary: Delete a drug
 *     description: Deletes a drug from the inventory using its MongoDB ObjectId.
 *     tags:
 *       - Drugs
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the drug.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Drug deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteDrugResponse'
 *
 *       400:
 *         description: Invalid drug ID
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
 *         description: Drug not found
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

router.delete('/delete_Drug/:id',authentication,Authorization("admin"), handleDeleteDrug)

/**
 * @swagger
 * /api/drug/search:
 *   get:
 *     summary: Search drugs
 *     description: Search active drugs by brand name, generic name, or both.
 *     tags:
 *       - Drugs
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: brandName
 *         required: false
 *         description: Brand name of the drug.
 *         schema:
 *           type: string
 *           example: Tocovid
 *
 *       - in: query
 *         name: genericName
 *         required: false
 *         description: Generic name of the drug.
 *         schema:
 *           type: string
 *           example: Vitamin E
 *
 *     responses:
 *       200:
 *         description: Drugs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchDrugsResponse'
 *
 *       400:
 *         description: Brand name or generic name is required
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/search', authentication, Authorization("admin", "doctor", "nurse"), handleGetDrugsByBrandAndGenericName)

export default router;
