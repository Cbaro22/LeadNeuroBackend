import mongoose from "mongoose";

const dataBase = async (connection = mongoose.connection) => {
    try {
        if (connection.readyState === 1) {
            return;
        }

        await mongoose.connect(process.env.MONGODB_URL);

        console.log("database connected..");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

export default dataBase;