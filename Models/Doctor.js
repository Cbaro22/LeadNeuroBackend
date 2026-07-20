import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    staff:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Staff",
       require:true
    },
    specialization:{
        type:String,
        require:true
    },
    licenseNum:{
        type:String,
        require:true
    },
    yearsOfExperience:{type:Number, required:true},
    consultingDay:String,
    clinicHours:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("Doctor", doctorSchema)