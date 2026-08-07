import mongoose from "mongoose";
import Nurse from "../Models/Nurse.js";
import Staff from "../Models/Staff.js";
import { successResponse } from "../Services/apiResponse.js";
import { errorResponse } from "../Services/apiResponse.js";
import { getValidatedSort } from "../Services/sortService.js";
import { getValidatedFilter } from "../Services/filterService.js";
import { getSearchQuery } from "../Services/searchServices.js";
import { getSelectedFields } from "../Services/selectField.js";
import cache from "../Services/cacheServices.js";
import { getPagination } from "../Services/paginationServices.js";


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

        const deletedNurse = await Nurse.findOneAndDelete({staff:staff_id});

            cache.flushAll()

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
      const { certification,wardAssigned,shift,yearsOfExperience,licenseNum,supervisor} = req.body;
        if( !certification|| !shift || !supervisor || !wardAssigned || !yearsOfExperience || !licenseNum  ){
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
    certification,
    wardAssigned,
    shift,
    yearsOfExperience,
    licenseNum
});
               cache.flushAll()

            console.log(res.body);

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
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const selectedFields = getSelectedFields(req.query.fields);
    const filter = getValidatedFilter(req.query, {
    
    certification: "exact",
    wardAssigned: "regex",
    shift: "exact",
    supervisor: "regex"
});


const searchQuery = getSearchQuery(req.query.search, [
"certification",
"wardAssigned",
"shift",
"licenseNum",
"supervisor",
]);
    
    const allowedSortFields = [
    "licenseNum",
    "shift",
    "yearsOfExperience",
    "wardAssigned",
    "supervisor",
    "createdAt"

];

const sort = getValidatedSort(req.query.sort, allowedSortFields);

    const skip =(page - 1) * limit;

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
        "List of nurses (cached)",
        cachedData
    );
}

    const totalNurses = await Nurse.countDocuments(query);

    const nurses = await Nurse.find(query)
    .populate("staff", "name email")
    .select(selectedFields)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

const pagination = getPagination(page, limit, totalNurses);

    const responseData = {
    ...pagination,
    totalNurses,
    nurses
};

cache.set(cacheKey, responseData);

        return successResponse(
    res,
    200,
    "List of nurses",
    responseData
);
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
        const {id:staff_id} = req.params;
        const {certification,wardAssigned,shift,yearsOfExperience,licenseNum,supervisor} = req.body;
        
            if(!mongoose.Types.ObjectId.isValid(staff_id)){
            const error = new Error("Invalid staff ID");
            error.statusCode = 400;
            return next(error);
        }
        const nurse = await Nurse.findOne({staff:staff_id})
        if(!nurse){
            const error = new Error("Nurse not found");
            error.statusCode = 404;
            return next(error);
        }

        if( !certification|| !shift || !supervisor || !wardAssigned || !yearsOfExperience || !licenseNum){
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error)};

        const updatedNurse = await Nurse.findOneAndUpdate({staff:staff_id},{certification,wardAssigned, shift,supervisor,
yearsOfExperience,licenseNum}, {returnDocument: "after"}).populate("staff", "name email");

          cache.flushAll()

        return successResponse(
    res,
    200,
    "Nurse updated successfully",
    updatedNurse
);
    } catch (error) {
        next(error)
    }
}


 

    

