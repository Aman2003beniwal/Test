import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        index:true
    },
    password: {
        type:String,
    },
    phone: Number,
}, { timestamps: true })


const User = mongoose.model("User", userSchema);
export default User;