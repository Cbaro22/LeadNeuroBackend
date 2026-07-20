
import mongoose, { mongo } from "mongoose";
import Drugs from "../Models/Drugs.js";

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
        return res.status(400).json({ message: "Drug with the same generic name and brand name already exists" });
    }   

    const newDrug = await Drugs.create({genericName,therapeuticClass,indications,contraindications,sideEffects,interactions,route,brandName,manufacturer,dosageForm,strength,nafdacNumber,costPrice,sellingPrice,minimumStockLevel,isActive});

    res.status(201).json(newDrug);
  } catch(error){
    next(error)
  }
    
}

export const handleGetAllDrugs = async (req, res, next) => {
    try{const drugs = await Drugs.find();
    res.status(200).json({
    message: "List of drugs retrieved successfully",
    drugs
});
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
    res.status(200).json({
    message: "Drug retrieved successfully",
    drug
});; 
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
    res.status(200).json({
    message: "Drugs retrieved successfully",
    count: drugs.length,
    drugs
});
    } catch(error){
        next(error)
    }

}

export const handleUpdateDrug = async (req, res, next) => {
    try{
        const { id } = req.params;
    const { genericName, therapeuticClass, indications, contraindications, sideEffects, interactions, route, brandName, manufacturer, dosageForm, strength, nafdacNumber, costPrice, minimumStockLevel, isActive } = req.body;  
    
    const drug = await Drugs.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid drug ID");
    error.statusCode = 400;
    return next(error);
}

if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid drug ID");
    error.statusCode = 400;
    return next(error);
}

        if (!drug) {
            const error = new Error("Drug not found");
            error.statusCode = 404;
            return next(error);
    }
    const deletedDrug = await Drugs.findByIdAndUpdate(id,  {genericName, therapeuticClass, indications, contraindications, sideEffects, interactions, route, brandName, manufacturer, dosageForm, strength, nafdacNumber, costPrice, minimumStockLevel, isActive,sellingPrice}, { new: true });
    res.status(200).json(updatedDrug);
    }catch(error){
        next(error)
    }

}

export const handleDeleteDrug = async (req, res, next) => {
    try{
        const { id } = req.params;
    const drug = await Drugs.findById(id);
    if (!drug) {
        const error = new Error("Drug not found");
        error.statusCode = 404;
        return next(error);
    }
    await Drugs.findByIdAndDelete(id);
    res.status(200).json({
    message: "Drug updated successfully",
    drug: updatedDrug
});
    } catch(error){
        next(error)
    }
}
