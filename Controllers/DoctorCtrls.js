import mongoose from "mongoose";
import Doctor from "../Models/Doctor.js";
import Staff from "../Models/Staff.js";
import { errorHandler } from "../Middlewares/errorHandler.js";

export const handlecreateDoctor = async (req, res, next) => {
        try{
            const {id:staff_id} = req.params;
        const {specialization, yearsOfExperience, clinicHours, consultingDay, licenseNum} = req.body;
        if(!staff_id || !specialization || yearsOfExperience === undefined || !clinicHours || !licenseNum){
const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error);

            }

        if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid staff ID");
            error.statusCode = 400;
            return next(error);
        }
        
        const doctorExists = await Doctor.findOne({staff: staff_id});
        if(doctorExists){
            if (doctorExists) {
    const error = new Error("Doctor account already exists");
    error.statusCode = 400;
    return next(error);
}
        }

        const staffExists = await Staff.findById(staff_id);
        if(!staffExists){
            const error = new Error("Staff not found");
            error.statusCode = 404;
            return next(error);
        }

        const doctor = await Doctor.create({
            staff: staff_id,
            specialization,
            yearsOfExperience,
            clinicHours,
            licenseNum,
            consultingDay
        });

        return successResponse(
    res,
    201,
    "Doctor data created successfully",
    doctor
);
        
        }catch (error) {
             next(error);
        }
}
export const handlegetAllDoctors = async (req, res, next) => {
        try{
            const doctors = await Doctor.find().populate("staff", "name email").lean();
        return successResponse(
    res,
    200,
    "Doctors retrieved successfully",
    doctors
);
        } catch (error) {
            next(error);
        }
    }

export const handlegetDoctorById = async (req, res, next) => {
       try{
         const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error("Invalid doctor ID");
            error.statusCode = 400;
            return next(error);
        }
        const doctor = await Doctor.findById(id).populate("staff", "name email").lean();
        if(!doctor){
            const error = new Error("Doctor not found");
            error.statusCode = 404;
            return next(error);
        }
        return successResponse(
            res,
            200,
            "Doctor found",
            doctor
        );
       } catch (error) {
            next(error);    
    }
}
export const handledeleteDoctor = async (req, res, next) => {
        try{const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error("Invalid doctor ID");
            error.statusCode = 400;
            return next(error);
        }
        const doctor = await Doctor.findById(id);
        if(!doctor){
            const error = new Error("Doctor not found");
            error.statusCode = 404;
            return next(error);
        }
       const deletedDoctor = await Doctor.findByIdAndDelete(id);
        return successResponse(
            res,
            200,
            "Doctor deleted successfully",
            deletedDoctor
        );
        } catch (error) {
            next(error) 
    }
}
export const handleupdatedoctor = async (req, res, next) => {
        try{const {id} = req.params;
        const {specialization, yearsOfExperience, clinicHours,consultingDay, licenseNum} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error("Invalid doctor ID");
            error.statusCode = 400;
            return next(error);
        }
        const doctor = await Doctor.findById(id);
        if(!doctor){
            const error = new Error("Doctor not found");
            error.statusCode = 404;
            return next(error);
        }
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {specialization, yearsOfExperience, clinicHours,consultingDay, licenseNum}, {new: true}).populate("staff", "name email");
        return successResponse(
            res,
            200,
            "Doctor updated successfully",
            updatedDoctor
        );} catch(error) {
        next(error) 
        }
    }