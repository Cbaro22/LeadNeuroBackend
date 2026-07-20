import mongoose from "mongoose";

import { randomUUID } from "crypto";

const staffSchema = new mongoose.Schema({
    staffId:{
        type: String,
        require:true,
        unique:true,
        default: () => randomUUID()
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phone : String,
    Address : String,
    role:{
        type:String,
        enum:["doctor", "nurse", "cleaner", "admin"],
        require:true
    },
    department: String,
    salary: Number,
    dateEmployed:{
        type: Date,
        default: Date.now
    },
    passwordResetToken: String,
    passwordResetExpires: Date  
},{timestamps: true})

export default mongoose.model("Staff", staffSchema)