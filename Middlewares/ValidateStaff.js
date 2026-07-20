import jwt from "jsonwebtoken"
import Staff from "../Models/Staff.js";

import dotenv from "dotenv"
dotenv.config()

export const validateStaff = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters long"})
        }
    

    const error = []

    if(!email){
        error.push("Please add your email")
    }

    if(!password){
        error.push("Please add your password")
    }

    if(error.length > 0){
        return res.status(400).json({message: error})
    }

    next()
}


export const authentication = async (req, res, next) => {
    try {
        
    const token = req.headers.authorization?.split(" ")[1] 

    if(! token){
        const error = new Error("Please Login");
        error.statusCode = 401;
        return next(error);
    }


    const decodedToken = jwt.verify(token, `${process.env.ACCESS_TOKEN}`)

    if(!decodedToken){
        const error = new Error("Invalid or expired token");
        error.statusCode = 401;
        return next(error);
    }

    const staff = await Staff.findById(decodedToken.id).select("-password");


    if(!staff){
        const error = new Error("Staff account not found");
        error.statusCode = 404;
        return next(error);
    }
    req.staff = staff

    next()
    } catch (error) {
        next(error)
    }

}

export const Authorization =(...allowedRoles) => { 

    return (req, res, next) => {

 if (!req.staff) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!allowedRoles.includes(req.staff.role || "admin" )) {
            return res.status(403).json({ message: "Unauthorized Access" })
        }
    next()
}
}