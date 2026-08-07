import rateLimit from "express-rate-limit";

const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const authLimiter = rateLimit({
    windowMs: FIFTEEN_MINUTES,
    limit: process.env.NODE_ENV === "test" ? 100000 : 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes."
    }
});