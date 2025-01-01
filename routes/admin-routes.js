const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")

const router = express.Router()
router.get("/", authMiddleware, adminMiddleware, (req, res)=>{
    
   res.json({
        message: "Admin page welcome"
    })
})

module.exports = router
