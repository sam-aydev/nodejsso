const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")

const router = express.Router()

router.get("/", authMiddleware, (req, res)=>{

    const { userId, username, role} = req.userInfo
    res.json({
        message: "Home page welcome",
        user: {
            _id: userId,
            username,
            role
        }
    })
})

module.exports = router