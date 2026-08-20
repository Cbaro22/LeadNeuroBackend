
import mongoose from "mongoose";
import Drugs from "../Models/Drugs.js";
import { successResponse } from "../Services/apiResponse.js";
import { getValidatedSort } from "../Services/sortService.js";
import { getValidatedFilter } from "../Services/filterService.js";
import { getSearchQuery } from "../Services/searchServices.js";
import { getSelectedFields } from "../Services/selectField.js";
import cache from "../Services/cacheServices.js";
import { getPagination } from "../Services/paginationServices.js";


export const handleCreateDrug = async (req, res, next) => {
    try {
        const {
            genericName,
            therapeuticClass,
            indications,
            contraindications,
            sideEffects,
            interactions,
            prescriptionRequired,
            route,
            brandName,
            manufacturer,
            dosageForm,
            strength,
            nafdacNumber,
            costPrice,
            sellingPrice,
            minimumStockLevel,
            isActive
        } = req.body;

        // Check whether the drug already exists
        const drugExists = await Drugs.findOne({
            genericName,
            brandName
        });

        if (drugExists) {
            const error = new Error(
                "Drug with the same generic name and brand name already exists"
            );
            error.statusCode = 400;
            return next(error);
        }

        const newDrug = await Drugs.create({
            genericName,
            therapeuticClass,
            indications,
            contraindications,
            sideEffects,
            interactions,
            prescriptionRequired,
            route,
            brandName,
            manufacturer,
            dosageForm,
            strength,
            nafdacNumber,
            costPrice,
            sellingPrice,
            minimumStockLevel,
            isActive
        });

        // Invalidate cached drug data
        cache.flushAll();

        return successResponse(
            res,
            201,
            "Drug created successfully",
            newDrug
        );

    } catch (error) {
        return next(error);
    }
};


export const handleGetAllDrugs = async (req, res, next) => {
    try {
        const page = Math.max(
            parseInt(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(parseInt(req.query.limit) || 10, 1),
            100
        );

        const selectedFields = getSelectedFields(
            req.query.fields
        );

        const filter = getValidatedFilter(req.query, {
            brandName: "regex",
            genericName: "regex",
            therapeuticClass: "regex",
            manufacturer: "regex",
            isActive: "exact"
        });

        const searchQuery = getSearchQuery(
            req.query.search,
            [
                "genericName",
                "brandName",
                "therapeuticClass",
                "manufacturer",
                "strength",
                "dosageForm"
            ]
        );

        const allowedSortFields = [
            "genericName",
            "brandName",
            "therapeuticClass",
            "manufacturer",
            "sellingPrice",
            "costPrice",
            "minimumStockLevel",
            "strength",
            "createdAt"
        ];

        const sort = getValidatedSort(
            req.query.sort,
            allowedSortFields
        );

        const skip = (page - 1) * limit;

        const query = {
            ...filter,
            ...searchQuery
        };

        const cacheKey = req.originalUrl;

        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return successResponse(
                res,
                200,
                "List of drugs retrieved successfully (cached)",
                cachedData
            );
        }

        const totalDrugs = await Drugs.countDocuments(query);

        const drugs = await Drugs.find(query)
            .select(selectedFields)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        const pagination = getPagination(
            page,
            limit,
            totalDrugs
        );

        const responseData = {
            ...pagination,
            totalDrugs,
            drugs
        };

        cache.set(cacheKey, responseData);

        return successResponse(
            res,
            200,
            "List of drugs retrieved successfully",
            responseData
        );

    } catch (error) {
        return next(error);
    }
};


export const handleGetDrugById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("Invalid drug ID");
            error.statusCode = 400;
            return next(error);
        }

        const drug = await Drugs.findById(id).lean();

        if (!drug) {
            const error = new Error("Drug not found");
            error.statusCode = 404;
            return next(error);
        }

        return successResponse(
            res,
            200,
            "Drug retrieved successfully",
            drug
        );

    } catch (error) {
        return next(error);
    }
};


export const handleGetDrugsByBrandAndGenericName = async (
    req,
    res,
    next
) => {
    try {
        const { brandName, genericName } = req.query;

        if (!brandName && !genericName) {
            const error = new Error(
                "Brand name or generic name is required"
            );
            error.statusCode = 400;
            return next(error);
        }

        const query = {
            isActive: true
        };

        if (brandName) {
            query.brandName = {
                $regex: new RegExp(brandName, "i")
            };
        }

        if (genericName) {
            query.genericName = {
                $regex: new RegExp(genericName, "i")
            };
        }

        const drugs = await Drugs.find(query).lean();

        return successResponse(
            res,
            200,
            "Drugs retrieved successfully",
            {
                count: drugs.length,
                drugs
            }
        );

    } catch (error) {
        return next(error);
    }
};


export const handleUpdateDrug = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("Invalid drug ID");
            error.statusCode = 400;
            return next(error);
        }

        const drug = await Drugs.findById(id);

        if (!drug) {
            const error = new Error("Drug not found");
            error.statusCode = 404;
            return next(error);
        }

        const {
            genericName,
            therapeuticClass,
            indications,
            contraindications,
            sideEffects,
            interactions,
            prescriptionRequired,
            route,
            brandName,
            manufacturer,
            dosageForm,
            strength,
            nafdacNumber,
            costPrice,
            sellingPrice,
            minimumStockLevel,
            isActive
        } = req.body;

        // Check for duplicate generic name + brand name
        if (genericName || brandName) {

            const duplicateDrug = await Drugs.findOne({
                _id: { $ne: id },
                genericName: genericName || drug.genericName,
                brandName: brandName || drug.brandName
            });

            if (duplicateDrug) {
                const error = new Error(
                    "Drug with the same generic name and brand name already exists"
                );
                error.statusCode = 400;
                return next(error);
            }
        }

        const updateData = {};

        if (genericName !== undefined) {
            updateData.genericName = genericName;
        }

        if (therapeuticClass !== undefined) {
            updateData.therapeuticClass = therapeuticClass;
        }

        if (indications !== undefined) {
            updateData.indications = indications;
        }

        if (contraindications !== undefined) {
            updateData.contraindications = contraindications;
        }

        if (sideEffects !== undefined) {
            updateData.sideEffects = sideEffects;
        }

        if (interactions !== undefined) {
            updateData.interactions = interactions;
        }

        if (prescriptionRequired !== undefined) {
            updateData.prescriptionRequired = prescriptionRequired;
        }

        if (route !== undefined) {
            updateData.route = route;
        }

        if (brandName !== undefined) {
            updateData.brandName = brandName;
        }

        if (manufacturer !== undefined) {
            updateData.manufacturer = manufacturer;
        }

        if (dosageForm !== undefined) {
            updateData.dosageForm = dosageForm;
        }

        if (strength !== undefined) {
            updateData.strength = strength;
        }

        if (nafdacNumber !== undefined) {
            updateData.nafdacNumber = nafdacNumber;
        }

        if (costPrice !== undefined) {
            updateData.costPrice = costPrice;
        }

        if (sellingPrice !== undefined) {
            updateData.sellingPrice = sellingPrice;
        }

        if (minimumStockLevel !== undefined) {
            updateData.minimumStockLevel = minimumStockLevel;
        }

        if (isActive !== undefined) {
            updateData.isActive = isActive;
        }

        const updatedDrug = await Drugs.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        // Invalidate cached drug data
        cache.flushAll();

        return successResponse(
            res,
            200,
            "Drug updated successfully",
            updatedDrug
        );

    } catch (error) {
        return next(error);
    }
};


export const handleDeleteDrug = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("Invalid drug ID");
            error.statusCode = 400;
            return next(error);
        }

        const deletedDrug = await Drugs.findByIdAndDelete(id).lean();

        if (!deletedDrug) {
            const error = new Error("Drug not found");
            error.statusCode = 404;
            return next(error);
        }

        // Invalidate all cached drug lists
        cache.flushAll();

        return successResponse(
            res,
            200,
            "Drug deleted successfully",
            deletedDrug
        );

    } catch (error) {
        return next(error);
    }
};


