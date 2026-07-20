import mongoose from "mongoose"


const dataBase = async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`database connected..`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

export default dataBase;