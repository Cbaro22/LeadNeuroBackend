
import mongoose, { mongo } from "mongoose";
import Drugs from "../Models/Drugs.js";
import { successResponse } from "../Services/apiResponse.js";
import { errorResponse } from "../Services/apiResponse.js";

export const handleCreateDrug = async (req, res, next) => {
  try{
    const {genericName,therapeuticClass,indications,contraindications,sideEffects,interactions,route,brandName,manufacturer,dosageForm,strength,nafdacNumber,costPrice,sellingPrice,minimumStockLevel,isActive} = req.body;
     if (!genericName || !therapeuticClass || !route || !brandName || !dosageForm || !strength || !nafdacNumber) {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        return next(error);
    }
    const drugExists = await Drugs.findOne({ genericName, brandName });

    if (drugExists) {
    const error = new Error(
        "Drug with the same generic name and brand name already exists"
    );
    error.statusCode = 400;
    return next(error);
}  

    const newDrug = await Drugs.create({genericName,therapeuticClass,indications,contraindications,sideEffects,interactions,route,brandName,manufacturer,dosageForm,strength,nafdacNumber,costPrice,sellingPrice,minimumStockLevel,isActive});

    return successResponse(
    res,
    201,
    "Drug created successfully",
    newDrug
);
  } catch(error){
    next(error)
  }
    
}

export const handleGetAllDrugs = async (req, res, next) => {
    try{
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100 );
        const sort = req.query.sort || "-createdAt"

        const skip = (page - 1) * limit;

        const totalDrugs = await Drugs.countDocuments();
        
        const drugs = await Drugs.find()
        .sort(sort)
        .skip(skip)
        .limit(limit);
    return successResponse(
    res,
    200,
    "List of drugs retrieved successfully",
    {
        totalDrugs,
        currentPage: page,
        totalPages: Math.ceil( totalDrugs / limit),
        limit,
        drugs
    }
);
} catch(error){
    next(error)
    }
}

export const handleGetDrugById = async (req, res, next) => {
    try{
        const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
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
    return successResponse(
    res,
    200,
    "Drug retrieved successfully",
    drug
); 
    } catch(error){
        next(error)
        
    }
}

export const handleGetDrugsByBrandAndGenericName = async (req, res, next) => {
    try{
        const { brandName, genericName } = req.query;
    if (!brandName && !genericName) {
        const error = new Error("brand or generic name is required ");
        error.statusCode = 400;
        return next(error);
    }
    const query = {isActive: true};
    if (brandName) {
        query.brandName = { $regex: new RegExp(brandName, "i")};
    } 
    if (genericName) {
        query.genericName = { $regex: new RegExp(genericName, "i") };
    }
    const drugs = await Drugs.find(query);
    return successResponse(
    res,
    200,
    "Drugs retrieved successfully",
    {
        count: drugs.length,
        drugs
    }
);
    } catch(error){
        next(error)
    }

}

export const handleUpdateDrug = async (req, res, next) => {
    try{
        const { id } = req.params;
    const { genericName, therapeuticClass, indications, contraindications, sideEffects, interactions, route, brandName, manufacturer, dosageForm, strength, nafdacNumber, costPrice, minimumStockLevel, isActive } = req.body;  
    
    
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
    const updatedDrug = await Drugs.findByIdAndUpdate(id,  {genericName, therapeuticClass, indications, contraindications, sideEffects, interactions, route, brandName, manufacturer, dosageForm, strength, nafdacNumber, costPrice, minimumStockLevel, isActive,sellingPrice}, { new: true });
    return successResponse(
        res,
        200,
        "Drug updated successfully",
        updatedDrug
    );
    }catch(error){
        next(error)
    }

}

export const handleDeleteDrug = async (req, res, next) => {
    try{
        const { id } = req.params;

if(mongoose.Types.ObjectId.isValid(id)){
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

   const deletedDrug = await Drugs.findByIdAndDelete(id);
    return successResponse(
        res,
        200,
        "Drug deleted successfully",
        deletedDrug
    );
    } catch(error){
        next(error)
    }
}
