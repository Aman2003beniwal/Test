

const createUser = (req, res) => {
    console.log("Req.body : ", req.body)

    res.status(201).json({
        message: "Xyz",
        success: true
    })

}

export default { createUser }

