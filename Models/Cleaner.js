import mongoose from "mongoose";

const cleanerSchema = new mongoose.Schema({
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        require: true
     },
     areaAssigned: String,
     shift:{
        type: String,
        enum: ["Morning", "Afternoon", "Night"],
    },
     supervisor: String,
     workSchedule:String,
},{timestamps: true});

export default mongoose.model("Cleaner", cleanerSchema)   