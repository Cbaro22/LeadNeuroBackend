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



export const handleCreateStaff = async(req,res,next)=>{

    try {
        const{role,password,email,doctorData,nurseData,cleanerData,...staffData}=req.body

    
    const existingStaff = await Staff.findOne({email})
    if(existingStaff){
        const error = new Error("Staff Account already exists");
        error.statusCode = 400;
        return next(error);
    }
       
    const hashedPassword = await bcrypt.hash(password,10)
    const newStaff= await Staff.create({...staffData,role, email, password:hashedPassword,})

    let roleData;

    if(role==="doctor"){
        roleData = (await Doctor.create({staff:newStaff._id,...doctorData}))
    }

    else if(role==="nurse"){
        roleData = await Nurse.create({staff:newStaff._id,...nurseData})
    }
    else if(role==="cleaner"){
        roleData = await Cleaner.create({staff:newStaff._id,...cleanerData})
    }

    await registerationEmail(newStaff.email)
    return successResponse(
    res,
    201,
    "Staff created successfully",
    {
        staff: newStaff,
        roleData,
        accessToken: generateAccessToken(newStaff),
        refreshToken: generateRefreshToken(newStaff)
    }
);
    } catch (error) {
        next(error)
    }
}

export const handleGetAllStaff =async(req,res,next)=>{
   try {

const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalStaff = await Staff.countDocuments();

     const staff = await Staff.find()

           .skip(skip)
            .limit(limit);

    return successResponse(
    res,
    200,
    "Staff retrieved successfully",
    {
                totalStaff,
                currentPage: page,
                totalPages: Math.ceil(totalStaff / limit),
                limit,
                staff
            }
);
   } catch (error) {
    next(error)
   }
}

export const handleGetStaffById = async(req,res,next)=>{
    try{
        const {id}= req.params
    const staff = await Staff.findById(id)
    if(!staff){
        const error = new Error("Staff not found");
        error.statusCode = 404;
        return next(error);
    };

    if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid staff ID");
    error.statusCode = 400;
    return next(error);
}

 let roleData = null;

    if(staff.role === "doctor"){
         roleData = await Doctor.findOne({staff:staff._id})
        
}
    else if(staff.role ==="nurse"){
         roleData = await Nurse.findOne({staff:staff._id})
    }
    else if(staff.role ==="cleaner"){
         roleData = await Cleaner.findOne({staff:staff._id})
    }

    return successResponse(
    res,
    200,
    "Staff retrieved successfully",
    {
        staff,
        roleData
    }
);
    }catch (error){
        next(error)
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

    console.log("Access Token:", accessToken);


    await loginEmail(staff.email)
    return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
        staff,
        accessToken,
        refreshToken
    }
});;
}catch(error){
    next(error)
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
        next(error)
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
        next(error)
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
        
        return successResponse(
    res,
    200,
    "Staff deleted successfully"
);
        } catch(error){
            console.error("Error deleting staff:", error);
            next(error)
        }
    
    }
export const handleUpdateStaff = async(req,res,next)=>{
       try{
        const {id} = req.params;
        const {name,email,phone, Address} = req.body

if(!mongoose.Types.ObjectId.isValid(id)){
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
        const updatedStaff = await Staff.findByIdAndUpdate(id, {name,email,phone, Address},{new:true})

        
        return successResponse(
    res,
    200,
    "Staff updated successfully",
    updatedStaff
);
       } catch(error){
        next(error)
       }
    }
