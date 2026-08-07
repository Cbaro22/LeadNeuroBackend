import mongoose from "mongoose";
import Cleaner from "../Models/Cleaner.js";
import Staff from "../Models/Staff.js";
import { successResponse } from "../Services/apiResponse.js";
import { getValidatedSort } from "../Services/sortService.js";
import { getValidatedFilter } from "../Services/filterService.js";
import { getSearchQuery } from "../Services/searchServices.js";
import { getSelectedFields } from "../Services/selectField.js";
import cache from "../Services/cacheServices.js";
import { getPagination } from "../Services/paginationServices.js";


export const handlecreatecleaner = async (req, res, next) => {

        try{const {staff_id} = req.params;
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

               cache.flushAll()

        return successResponse(
    res,
    201,
    "Cleaner data created successfully",
    cleaner
);}
         catch(error){
         return next(error)
        }
    } 
    
export const handlegetAllCleaners = async (req, res, next) => {

     try{
        const page = Math.max(parseInt(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
      const selectedFields = getSelectedFields(req.query.fields);
      const filter = getValidatedFilter(req.query, {
    shift: "exact",
    supervisor: "regex",
    areaAssigned: "regex"
});

const searchQuery = getSearchQuery(req.query.search, [
    "shift",
    "supervisor",
    "areaAssigned",
    "workSchedule"
]);
       
      const allowedSortFields = [
    "shift",
    "supervisor",
    "areaAssigned",
    "workSchedule",
    "createdAt"
];

const sort = getValidatedSort(req.query.sort, allowedSortFields);

      const skip = (page - 1) * limit

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
        "List of cleaners (cached)",
        cachedData
    );
}

      const totalCleaners = await Cleaner.countDocuments(query)

     const cleaners = await Cleaner.find(query)
    .populate("staff", "name email")
    .select(selectedFields)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

  const pagination = getPagination(page, limit, totalCleaners);

      const responseData = {
    ...pagination,
    totalCleaners,
    cleaners
};

cache.set(cacheKey, responseData);


      return successResponse(
    res,
    200,
    "List of cleaners",
    
    responseData
);
    } catch(error){
      return  next(error)
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
        return    next(error)
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

           cache.flushAll()

        return successResponse(
    res,
    200,
    "Cleaner deleted successfully",
    deletedCleaner
);
} catch (error) {
        return    next(error)
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
        const updatedCleaner = await Cleaner.findOneAndUpdate({staff: staff_id}, {shift,supervisor ,areaAssigned ,workSchedule},{ returnDocument: "after" }
 ).populate("staff", "name email");

        cache.flushAll()


        return successResponse(
    res,
    200,
    "Cleaner updated successfully",
    updatedCleaner
);
    } catch (error) {
     return   next(error)
    }
}
    