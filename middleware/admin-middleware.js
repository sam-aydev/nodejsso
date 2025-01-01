const jwt = require("jsonwebtoken")

const adminMiddleware = (req, res, next)=>{
     if(req.userInfo.role !== "admin"){
        return res.status(400).json({
            message: "Error - you are not permitted!"
        })
    }
    next()
}

module.exports = adminMiddleware