const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")
const uploadMiddleware = require("../middleware/image-middleware")
const {uploadImage, fetchImage, deleteImage} = require("../controllers/image-controller")
const router = express.Router()


router.post("/upload", authMiddleware, adminMiddleware, uploadMiddleware.single("image"),uploadImage)
router.get("/",authMiddleware, adminMiddleware, fetchImage)
router.delete("/:id", authMiddleware, adminMiddleware, deleteImage )

module.exports = router