
import JWT from "jsonwebtoken"
const tokenVerify = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Access denied , Login again."
        })
    }

    try {
        const decode = JWT.verify(token, process.env.SECRECTKEY);
        req.user = decode;
        next()

    } catch (error) {
        console.log("Error : ", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });

    }


}

export default tokenVerify