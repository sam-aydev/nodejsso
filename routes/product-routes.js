const express= require("express")
const { insertSample, getProducts, getProductAnalysis } = require("../controllers/product-controller")

const router = express.Router()

router.post("/insert", insertSample)
router.get("/", getProducts)
router.get("/analysis", getProductAnalysis)

module.exports = router