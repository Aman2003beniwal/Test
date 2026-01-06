import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

(async () => {
    // console.log("process.env.MONGOURL : ", process.env.MONGOURL)
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("Database is connect successfully...")
    } catch (error) {
        console.log("Error : ", error)
    }
})()

app.listen(process.env.PORT, () => {
    console.log(`App is listen on ${process.env.PORT} `);
})