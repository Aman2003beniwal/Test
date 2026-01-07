import requestBody from "../middleware/requestBody.js";
import express from "express"
import userController from "../controllers/userController.js"
const router = express.Router();

router.post("/createUser", requestBody, userController.createUser)
router.get("/getUser", userController.getAllUser)
router.put("/updateUser", requestBody, userController.updateUser)

export default router 