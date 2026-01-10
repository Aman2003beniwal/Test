import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from './routes/userRouter.js';

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", userRoute)

const startServer = async () => {
    try {
        // console.log("MONGOURL:", process.env.MONGOURL);

        await mongoose.connect(process.env.MONGOURL);
        console.log("Database connected");

        app.listen(process?.env?.PORT, () => {
            console.log(`Server running on port ${process?.env?.PORT}`);
        });
    } catch (error) {
        console.error("Startup failed:", error.message);
        process.exit(1);
    }
};

startServer();



