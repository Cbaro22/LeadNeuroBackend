import jwt from "jsonwebtoken"
import crypto from "crypto"
import dotenv from "dotenv"
dotenv.config()

export const generateAccessToken = (staff)=>{
    return jwt.sign({id:staff?._id, role:staff?.role}, 
        `${process.env.ACCESS_TOKEN}`, 
        {expiresIn:"1d"})
}

export const generateRefreshToken=(staff)=>{
    return jwt.sign({id:staff?._id, role:staff?.role}, 
        `${process.env.REFRESH_TOKEN}`, 
        {expiresIn:"7d"})
}

export const generateResetToken= async (staff)=>{
    
    const resetToken = crypto.randomBytes(32).toString("hex")
    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    staff.passwordResetToken = hashedResetToken
    staff.passwordResetExpires = Date.now() + 10 * 60 * 1000
     
    
    await staff.save()

    return resetToken
}
