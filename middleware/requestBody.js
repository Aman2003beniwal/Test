const requestBody = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            message: "Request body is required.."
        })
    }
    next();
}

export default requestBody;