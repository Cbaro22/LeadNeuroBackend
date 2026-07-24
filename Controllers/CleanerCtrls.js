import mongoose from "mongoose";
import Cleaner from "../Models/Cleaner.js";
import Staff from "../Models/Staff.js";
import { successResponse } from "../Services/apiResponse.js";
import { errorResponse } from "../Services/apiResponse.js";


export const handlecreatecleaner = async (req, res, next) => {

        try{const {id:staff_id} = req.params;
        const {shift, supervisor,areaAssigned,workSchedule} = req.body;
        if(!staff_id || !shift || !supervisor || !areaAssigned || !workSchedule){
            const error = new Error("All fields are required");
error.statusCode = 400;
return next(error);
        }
        if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid staff ID");
            error.statusCode = 400;
            return next(error);
        }

        const cleanerExists = await Cleaner.findOne({staff: staff_id});
        if(cleanerExists){
            const error = new Error("Cleaner account already exists");
            error.statusCode = 400;
            return next(error);
        }
        const staffExists = await Staff.findById(staff_id);
        if(!staffExists){
             const error = new Error("Staff not found");
            error.statusCode = 404;
            return next(error);
        
        }
        const cleaner = await Cleaner.create({
            staff: staff_id,
            shift,supervisor,areaAssigned,workSchedule
        });
        return successResponse(
    res,
    201,
    "Cleaner data created successfully",
    cleaner
);}
         catch(error){
          next(error)
        }
    } 
    
export const handlegetAllCleaners = async (req, res, next) => {

     try{
        const page = Math.max(parseInt(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
      const sort = req.query.sort || "-createdAt"

      const skip = (page - 1) * limit

      const totalCleaners = await Cleaner.countDocuments()

    const cleaners = await Cleaner.find()
    .populate("staff", "name email")
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
        return successResponse(
    res,
    200,
    "Cleaners retrieved successfully",
    {
        totalCleaners,
        currentPage: page,
        totalPages: Math.ceil(totalCleaners / limit),
        limit,
        cleaners}

);
    } catch(error){
        next(error)
    }
        
    }

export const handlegetCleanerById = async (req, res, next) => {
        try {
            const {id:staff_id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid staff ID");
            error.statusCode = 400;
            return next(error);
        }
           
        const cleaner = await Cleaner.findOne({staff: staff_id}).populate("staff", "name email").lean();
        if(!cleaner){
            const error = new Error("Cleaner not found");
            error.statusCode = 404;
            return next(error);
        }
        return successResponse(
    res,
    200,
    "Cleaner retrieved successfully",
    cleaner
);
        } catch (error) {
            next(error)
        }
    }

export const handledeleteCleaner = async (req, res, next) => {

        try{const {id:staff_id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid staff ID");
            error.statusCode = 400;
            return next(error);
        }
        const cleaner = await Cleaner.findOne({staff: staff_id});
        if(!cleaner){
            const error = new Error("Cleaner not found");
            error.statusCode = 404;
            return next(error);
        }
        const deletedCleaner = await Cleaner.findOneAndDelete({staff: staff_id});
        return successResponse(
    res,
    200,
    "Cleaner deleted successfully",
    deletedCleaner
);
} catch (error) {
            next(error)
        }
    }

export const handleupdateCleaner = async (req, res, next) => {
        try {
            const {id:staff_id} = req.params;
            const {shift, supervisor,areaAssigned,workSchedule } = req.body;
            if(!staff_id || !shift || !supervisor || !areaAssigned || !workSchedule){
                const error = new Error("All fields are required");
                error.statusCode = 400;
                return next(error);
            }
                
            if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid staff ID");
            error.statusCode = 400;
            return next(error); 
        } 
        const cleaner = await Cleaner.findOne({staff: staff_id});
        if(!cleaner){
            const error = new Error("Cleaner not found");
            error.statusCode = 404;
            return next(error);
           
        }
        const updatedCleaner = await Cleaner.findOneAndUpdate({staff: staff_id}, {shift,supervisor ,areaAssigned ,workSchedule}, {new: true}).populate("staff", "name email");
        return successResponse(
    res,
    200,
    "Cleaner updated successfully",
    updatedCleaner
);
    } catch (error) {
        next(error)
    }
}
    