import mongoose from "mongoose";

const nurseSchema = new mongoose.Schema({
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        require: true
    },
    certification: {
        type: String,
        enum: ["RN", "LPN", "CNA","BscN"],
    },
    wardAssigned:String,
    shift:{
        type: String,
        enum: ["Morning", "Afternoon", "Night"],
    },
    yearsOfExperience: Number,
    licenseNum:String
},{timestamps: true});

export default mongoose.model("Nurse", nurseSchema)