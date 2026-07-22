const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://your-frontend.onrender.com"
];

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
    optionsSuccessStatus: 200
};

export default corsOptions;