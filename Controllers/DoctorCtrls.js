import mongoose from "mongoose";
import Doctor from "../Models/Doctor.js";
import Staff from "../Models/Staff.js";
import { successResponse} from "../Services/apiResponse.js";
import { errorResponse } from "../Services/apiResponse.js";
import { getValidatedSort } from "../Services/sortService.js";
import { getValidatedFilter } from "../Services/filterService.js";
import { getSearchQuery } from "../Services/searchServices.js";
import { getSelectedFields } from "../Services/selectField.js";
import cache from "../Services/cacheServices.js";
import { getPagination } from "../Services/paginationServices.js";

export const handlecreateDoctor = async (req, res, next) => {
        try{

            console.log("Reached controller");
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
    const error = new Error("Doctor account already exists");
    error.statusCode = 409;
    return next(error);
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

        cache.flushAll()

        return successResponse(
    res,
    201,
    "Doctor data created successfully",
    doctor
);
        
        }catch (error) {
        return     next(error);
        }
}
export const handlegetAllDoctors = async (req, res, next) => {
        try{

const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
        const selectedFields = getSelectedFields(req.query.fields);

        const filter = getValidatedFilter(req.query, {
    specialization: "regex",
    consultingDay: "regex",
    clinicHours: "regex"
});
        const searchQuery = getSearchQuery(req.query.search, [
    "specialization",
    "licenseNum",
    "consultingDay",
    "clinicHours"
]);
        const allowedSortFields = [
    "specialization",
    "yearsOfExperience",
    "clinicHours",
    "consultingDay",
    "licenseNum",
    "createdAt"
];

const sort = getValidatedSort(req.query.sort, allowedSortFields);

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
        "List of doctors (cached)",
        cachedData
    );
}

const totalDoctors = await Doctor.countDocuments(query);

const doctors = await Doctor.find(query)
       
 .populate("staff", "name email")
 .select(selectedFields)
 .sort(sort)
 .skip(skip)
 .limit(limit)
 .lean();

const pagination = getPagination(page, limit, totalDoctors);

const responseData = {
    ...pagination,
    totalDoctors,
    doctors
};

cache.set(cacheKey, responseData);

        return successResponse(
    res,
    200,
    "List of doctors",
    responseData
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
        console.error("FULL ERROR:", error);
    console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);
        console.log(error)
        
         return   next(error);    
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

        cache.flushAll()

        return successResponse(
            res,
            200,
            "Doctor deleted successfully",
            deletedDoctor
        );
        } catch (error) {

   return next(error);
             
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

             cache.flushAll()

        return successResponse(
            res,
            200,
            "Doctor updated successfully",
            updatedDoctor
        );} catch(error) {
      return  next(error) 
        }
    }