import rateLimit from "express-rate-limit";

const ONE_HOUR = 60 * 60 * 1000;

export const passwordLimiter = rateLimit({
    windowMs: ONE_HOUR,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many password reset requests. Please try again after one hour."
    }
});