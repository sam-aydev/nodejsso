const jwt = require("jsonwebtoken")


const authMiddleware = (req, res, next)=>{
    const authHeaders = req.headers["authorization"]
    console.log(authHeaders)
    const token = authHeaders && authHeaders.split(" ")[1]
    if(!token ){
        return res.status(400).json({
            success: false,
            message:" Access denied, please relogin"
        })
    }

    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decodedTokenInfo)   
        
        req.userInfo = decodedTokenInfo
        next()

    } catch (error) {
        return res.status(500).json({
            sucess: false
        })
    }
}

module.exports = authMiddleware