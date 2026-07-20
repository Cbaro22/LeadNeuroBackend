import mongoose from "mongoose";
import Cleaner from "../Models/Cleaner.js";
import Staff from "../Models/Staff.js";


export const handlecreatecleaner = async (req, res, next) => {

        try{const {id:staff_id} = req.params;
        const {shift, supervisor,areaAssigned,workSchedule} = req.body;
        if(!staff_id || !shift || !supervisor || !areaAssigned || !workSchedule){
            return res.status(400).json({message: "All fields are required"})
        }
        if(!mongoose.Types.ObjectId.isValid(staff_id)){
            return res.status(400).json({message: "Invalid staff ID"})
        }

        const cleanerExists = await Cleaner.findOne({staff: staff_id});
        if(cleanerExists){
            return res.status(400).json({message: "Cleaner account already exists"})
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
        res.status(201).json({message: "Cleaner data created successfully", cleaner})}
         catch(error){
          next(error)
        }
    } 
    
export const handlegetAllCleaners = async (req, res, next) => {
    try{
        const cleaners = await Cleaner.find().populate("staff", "name email").lean();
        res.status(200).json({Message:"List of cleaners", cleaners});
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
        res.status(200).json({cleaner});
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
        res.status(200).json({message: "Cleaner deleted successfully", deletedCleaner});} catch (error) {
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
        res.status(200).json({message: "Cleaner updated successfully", updatedCleaner});
    } catch (error) {
        next(error)
    }
}
    