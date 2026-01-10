import requestBody from "../middleware/requestBody.js";
import express from "express"
import userController from "../controllers/userController.js"
import tokenVerify from "../middleware/tokenVerify.js";
const router = express.Router();

router.post("/login", requestBody, userController.login);

router.get("/getUser", tokenVerify, userController.getAllUser)

router.post("/createUser", requestBody, userController.createUser)
router.put("/updateUser",tokenVerify, requestBody, userController.updateUser);


export default router 