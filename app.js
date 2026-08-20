import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { limiter } from "./Middlewares/rateLimiter.js";
import errorHandler  from "./Middlewares/errorHandler.js";
import routes from "./Routes/indexRoute.js";
import swaggerSpec from "./config/swagger.js";
import corsOptions from "./config/corsOptions.js";

const app = express();

app.use(helmet());

app.use(limiter);

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/api/v1", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Lead Neuro Backend API v1",
        documentation: "https://leadneurobackend.onrender.com/api-docs"
    });
});

app.use("/api/v1", routes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/test", (req, res) => {
    console.log("Test route hit");
    res.send("Server is working");
});

app.get("/", (req, res) => {
    res.status(200).json({
       success: true,
       message: "Lead Neuro Backend API is running"
})
});

app.use(errorHandler);

export default app;