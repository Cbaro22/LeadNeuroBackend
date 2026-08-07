import rateLimit from "express-rate-limit";

 export const limiter = rateLimit({


    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === "test" ? 100000 : 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again in 15 minutes."
    }
});

