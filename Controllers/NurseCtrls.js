import mongoose from "mongoose";
import Nurse from "../Models/Nurse.js";
import Staff from "../Models/Staff.js";


export const handledeleteNurse = async (req, res, next) => {

        try{const {id:staff_id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid Nurse ID");
            error.statusCode = 400;
            return next(error);
        };
        const nurse = await Nurse.findOne({staff: staff_id});
        if(!nurse){
            const error = new Error("Nurse account not Found")
            error.statusCode = 404
            return next(error)
        }

        const deletedNurse = await Nurse.findByIdAndDelete({staff:staff_id});
        return successResponse(
    res,
    200,
    "Nurse deleted successfully",
    deletedNurse
);;
    } catch(error){
            next(error)
        }
    }
export const handlecreateNurse = async (req, res, next) => {
    try{
        const { id: staff_id } = req.params;
        const { department, shift, supervisor, workSchedule} = req.body;
        if(!staff_id || !department || !shift || !supervisor || !workSchedule){
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error)};

            if(!mongoose.Types.ObjectId.isValid(staff_id)){
                const error = new Error("Invalid staff ID");
                error.statusCode = 400;
                return next(error);
            }

            const nurseExists = await Nurse.findOne({staff: staff_id});
            if(nurseExists){
                const error = new Error("Nurse account already exists");
                error.statusCode = 400;
                return next(error);
            }
            const staffExists = await Staff.findById(staff_id);
            if(!staffExists){
                const error = new Error("Staff not found");
                error.statusCode = 404;
                return next(error);
                
            }

            const nurse = await Nurse.create({
                staff: staff_id,
                department, shift, supervisor, workSchedule
            });
            return successResponse(
    res,
    201,
    "Nurse data created successfully",
    nurse
);
        }
           catch(error){
            next(error)
        }
    }


    
export const handlegetAllNurses = async (req, res, next) => {
    try{
        const nurses = await Nurse.find().populate("staff", "name email").lean();
        return successResponse(
    res,
    200,
    "List of nurses",
    nurses
);;
    } catch(error){
        next(error)
    }
        
    }

export const handlegetNurseById = async (req, res, next) => {
    try {
        const {id:staff_id} = req.params;  

        if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid staff ID");
            error.statusCode = 400;
            return next(error);
        }
           
        const nurse = await Nurse.findOne({staff: staff_id}).populate("staff", "name email").lean();
        if(!nurse){
            const error = new Error("Nurse not found");
            error.statusCode = 404;
            return next(error);
        }
        return successResponse(
    res,
    200,
    "Nurse retrieved successfully",
    nurse
);;
    } catch(error){
            next(error)
        }
    }

export const handleUpdateNurse = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {staff_id, department, shift, supervisor, workSchedule} = req.body;
        if(!staff_id || !department || !shift || !supervisor || !workSchedule){
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error)};

            if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid staff ID");
            error.statusCode = 400;
            return next(error);
        }
        const nurse = await Nurse.findOne({id:staff_id})
        if(!nurse){
            const error = new Error("Nurse not found");
            error.statusCode = 404;
            return next(error);
        }

        const updatedNurse = await Nurse.findByIdAndUpdate(id,{staff:staff_id, department, shift, supervisor, workSchedule}, {new: true}).populate("staff", "name email");
        return successResponse(
    res,
    200,
    "Nurse updated successfully",
    updatedNurse
);;
    } catch (error) {
        next(error)
    }
}


 

    

