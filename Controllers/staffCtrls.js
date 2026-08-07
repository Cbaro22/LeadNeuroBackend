import Staff from "../Models/Staff.js"
import Doctor from "../Models/Doctor.js"
import Nurse from "../Models/Nurse.js"


import bcrypt from "bcrypt"
import {generateAccessToken, generateRefreshToken, generateResetToken} from "../Services/tokenServices.js"
import { deleteAccountEmail, forgotPasswordEmail, loginEmail, registerationEmail, resetPasswordEmail } from "../Services/emailServices.js"

import crypto from "crypto"
import Cleaner from "../Models/Cleaner.js"
import mongoose from "mongoose"
import { successResponse } from "../Services/apiResponse.js"
import { errorResponse } from "../Services/apiResponse.js"
import { getValidatedSort } from "../Services/sortService.js"
import { getValidatedFilter } from "../Services/filterService.js"
import { getSearchQuery } from "../Services/searchServices.js"
import { getSelectedFields } from "../Services/selectField.js"
import cache from "../Services/cacheServices.js"
import { getPagination } from "../Services/paginationServices.js"



export const handleCreateStaff = async(req,res,next)=>{

    try {
        const{role,password,email,...staffData}=req.body

    
    const existingStaff = await Staff.findOne({email})
    if(existingStaff){
        const error = new Error("Staff Account already exists");
        error.statusCode = 409;
        return next(error);
    }
       
    const hashedPassword = await bcrypt.hash(password,10)
    const newStaff= await Staff.create({...staffData,role, email, password:hashedPassword,})



    await registerationEmail(newStaff.email)

      cache.flushAll()

    return successResponse(
    res,
    201,
    "Staff created successfully",
    {
        staff: newStaff,
        accessToken: generateAccessToken(newStaff),
        refreshToken: generateRefreshToken(newStaff)
    }
);
    } catch (error) {
       return next(error)
    }
}

export const handleGetAllStaff =async(req,res,next)=>{
   try {

const page = Math.max(parseInt(req.query.page) || 1, 1);
const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
const selectedFields = getSelectedFields(req.query.fields);


const filter = getValidatedFilter(req.query, {
    name: "regex",
    department: "regex",
    role: "exact"
});

const searchQuery = getSearchQuery(
    req.query.search,
    [
        "name",
        "email",
        "department"
    ]
);


const allowedSortFields = [
    "name",
    "email",
    "department",
    "salary",
    "role",
    "createdAt",
    "dateEmployed"
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
                "Staff retrieved successfully (cached)",
                cachedData
            );
        }

const totalStaff = await Staff.countDocuments(query);

const staff = await Staff.find(query)
           .sort(sort)
           .skip(skip)
           .limit(limit)
           .lean()
           .select(selectedFields)



const pagination = getPagination(page, limit, totalStaff);

        const responseData = {
            ...pagination,
            totalStaff,
            staff
        };

                cache.set(cacheKey, responseData);

return successResponse(
    res,
    200,
    "Staff retrieved successfully",
    responseData
);
   } catch (error) {
  return  next(error)
   }
}

export const handleGetStaffById = async(req,res,next)=>{
    try{
        const {id}= req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid staff ID");
    error.statusCode = 400;
    return next(error);
}
         const staff = await Staff.findById(id)

 if(!staff){
        const error = new Error("Staff not found");
        error.statusCode = 404;
        return next(error);
    };

    
    return successResponse(
    res,
    200,
    "Staff retrieved successfully",
    {
        staff
    }
);
    }catch (error){
     return   next(error)
        }

}

export const handleLoginStaff = async(req,res, next)=>{
    
try{
    const {email,password} = req.body
    if(!email || !password){
        const error = new Error("All fields are required");
        error.statusCode = 400;
        return next(error);
    }
    const staff = await Staff.findOne({email})
    if(!staff){
        const error = new Error("Account not found");
        error.statusCode = 404;
        return next(error);
    }
    const isMatch = await bcrypt.compare(password,staff.password)
    if(!isMatch){
        const error = new Error("Incorrect email or password");
        error.statusCode = 401;
        return next(error);
    }
    
   
    const accessToken = generateAccessToken(staff)
    const refreshToken=generateRefreshToken(staff)

    


    await loginEmail(staff.email)

    return successResponse(
    res,
    200,
    "Login successful",
    {
        staff,
        accessToken,
        refreshToken
    }
);;
}catch(error){
  return  next(error)
}
}

export const handleForgotPassword = async(req,res, next)=>{
    try{
        const {email}=req.body 

    console.log("Email from request:", email);
    
    const staff = await Staff.findOne({email})

    
    
    if(!staff){
        const error = new Error("Account not found");
        error.statusCode = 404;
        return next(error);
    }
    const resetToken =  await generateResetToken(staff)

    
    await forgotPasswordEmail(staff.email, resetToken)
    return successResponse(
    res,
    200,
    "Password reset email sent",
    {
        resetToken
    }
);
    }catch(error){

    console.error("LOGIN ERROR");
    console.error(error);
    return next(error);
}
      
}
export const handleResetPassword = async(req,res, next)=>{ 
       try{
 const {email, token, password} = req.body

        const hashedResetToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
        
        const staff = await Staff.findOne({email, passwordResetToken: hashedResetToken,
    passwordResetExpires: { $gt: Date.now()}});

        if(!staff){
            const error = new Error("Invalid or expired token");
            error.statusCode = 404;
            return next(error);
        }

        
        const hashedPassword = await bcrypt.hash(password,10)
        staff.password = hashedPassword

        

        staff.passwordResetToken = undefined;
        staff.passwordResetExpires = undefined;

        await staff.save()


       await resetPasswordEmail(staff.email)
        return successResponse(
    res,
    200,
    "Password reset successful"
);

       }catch(error){
      return  next(error)
       }
    }
export const handleDeleteStaff = async(req,res, next)=>{
        try{
            const {id} = req.params
        

if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid staff ID");
    error.statusCode = 400;
    return next(error);
}

const staff = await Staff.findById(id) 


        if(!staff){
            const error = new Error("Staff not found");
            error.statusCode = 404;
            return next(error);
        }
        await Staff.findByIdAndDelete(id)
        await deleteAccountEmail(staff.email)

        cache.flushAll()
        
        return successResponse(
    res,
    200,
    "Staff deleted successfully"
);
        } catch(error){
            console.error("Error deleting staff:", error);
          return  next(error)
        }
    
    }
export const handleUpdateStaff = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid staff ID");
      error.statusCode = 400;
      return next(error);
    }

    const staff = await Staff.findById(id);

    if (!staff) {
      const error = new Error("Staff not found");
      error.statusCode = 404;
      return next(error);
    }

    const {
      name,
      email,
      phone,
      Address,
      department,
      role,
      salary,
    } = req.body;

    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        Address,
        department,
        role,
        salary,
      },
      { new: true, runValidators: true }
    );

    cache.flushAll();

    return successResponse(
      res,
      200,
      "Staff updated successfully",
      updatedStaff
    );
  } catch (error) {
    return next(error);
  }
};
