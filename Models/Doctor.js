import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    staff:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Staff",
       required:true
    },
    specialization:{
        type:String,
        required:true
    },
    licenseNum:{
        type:String,
        required:true
    },
    yearsOfExperience:{type:Number, required:true},
    consultingDay:String,
    clinicHours:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("Doctor", doctorSchema)