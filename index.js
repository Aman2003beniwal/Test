import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoute from './routes/userRouter.js';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
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



