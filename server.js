import dotenv from "dotenv"
import express from "express";
import dataBase from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import {limiter} from "./Middlewares/rateLimiter.js";
import routes from "./Routes/indexRoute.js";
import morgan from 'morgan';
import { errorHandler } from "./Middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { passwordLimiter } from "./Middlewares/passwordLimiter.js";
import { authLimiter } from "./Middlewares/authLimiter.js";
import corsOptions from "./config/corsOptions.js";
import { successResponse, errorResponse } from "./Services/apiResponse.js";


dotenv.config();


const app = express();
app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))

app.get("/api/v1", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Lead Neuro Backend API v1",
        documentation: "https://leadneurobackend.onrender.com/api-docs"
    });
});

app.use('/api/v1', routes)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use(errorHandler)
dataBase();

app.get("/test", (req, res) => {
    console.log("Test route hit");
    res.send("Server is working");
});



app.get('/', (req, res) =>{
    res.json("Lead Neuro Backend Api is runing....")
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(` app is listening at port ${PORT}`)})
    



