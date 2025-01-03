const express= require("express")
const { insertSample } = require("../controllers/product-controller")

const router = express.Router()

router.post("/", insertSample)

module.exports = router