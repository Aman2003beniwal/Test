import User from "../model/userModel.js";
import { requestBodyValidator } from "../utils/commonValidation.util.js";
import bcrypt from "bcrypt"

const createUser = async (req, res) => {

    const { name, email, phone, password } = req.body;
    // console.log("req.body : ", req.body)

    // console.log("name, email , phone , password : ", name , email , phone , password)


    //// this is used when we are using the utils functon requestBodyValidator 
    // const isValid = requestBodyValidator({
    //    body:req?.body,
    //    fieldArr:["name","email","password","phone"] 
    // });

    // if(!isValid.success){
    //     return res.status(400).json(isValid);
    // } 


    const error = {};

    if (!name || name.trim() === "") {
        error.name = "Name is required.."
    }

    if ((!email || email.trim() === "")) {
        error.email = "Email is required..."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        error.email = "Invalid email format.."
    }

    if (!password || password.length < 6) {
        error.password = "Password must be 6 digit..."
    }

    if (!phone || phone.trim() === "") {
        error.phone = "Phone number is required.."
    } else if (phone.length !== 10) {
        error.phone = "Phone no length must be 10 digits"
    }


    if (Object.keys(error).length > 0) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }

    try {
        const bcryptPassword = await bcrypt.hash(password, 10);
        const payload = { ...req.body, password: bcryptPassword };

        const isExits = await User.findOne({ email })

        if (isExits) {
            return res.status(409).json({
                status: false,
                message: "Email is already exits ,please try with new Email..."
            })
        }

        // console.log("isExits : ", isExits)

        const user = new User({
            ...payload
        })

        const userData = await user.save();

        console.log("userData :", userData)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userData
        });


    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Interal server error.."
        })

    }
}

const getAllUser = async (req, res) => {
    try {

        // const data = await User.find().select("-password");
        const data = await User.find().select("email id name phone");
        if (data.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Till now we have no register any data till now...",
                data: data
            })
        } else {
            res.status(200).json({
                success: true,
                // data: data.map((data) => ({
                //     name: data?.name,
                //     email: data?.email,
                //     phone: data.phone
                // }
                // ))
                data


            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Interal server error.."
        })

    }

}

const updateUser = async (req, res) => {
    const { _id, ...dataUpdate } = req.body;
    if (!_id) {
        return res.status(400).json({
            success: false,
            message: "we need _Id of user to update user",
        })
    }

    try {
        const exitsUser = await User.findById(_id);
        // console.log("existing user : ", exitsUser)

        if (!exitsUser) {
            return res.status(400).json({
                success: false,
                message: "User not found. Cannot update."
            })
        }

        const updateUser = await User.findByIdAndUpdate(_id, dataUpdate, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            success: true,
            message: "User is update successfully..",
            updateData: { ...dataUpdate },
            userAfterUpdate:updateUser
        })
    } catch (error) {
         console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error.."
        })
    }

}

export default { createUser, getAllUser, updateUser }

