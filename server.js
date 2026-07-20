import dotenv from "dotenv"
import express from "express";
import dataBase from "./config/db.js";
import cors from "cors";
import routes from "./Routes/indexRoute.js";
import morgan from 'morgan';
import { errorHandler } from "./Middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'))
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
    



