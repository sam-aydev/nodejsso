require("dotenv").config()
const express = require("express")
const authRoutes = require("./routes/auth-routes")
const homeRoutes = require("./routes/home-routes")
const connectToDb = require("./database/db")
const adminRoutes = require("./routes/admin-routes")
const imageRoutes = require("./routes/image-routes")
const productRoutes = require("./routes/product-routes")
const app = express()


app.get("/", (req, res)=>{
    res.send("hello")
})
const PORT = process.env.PORT ?? 3000

connectToDb()
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/home", homeRoutes )
app.use("/api/admin", adminRoutes)
app.use("/api/image", imageRoutes)
app.use("/api/insert", productRoutes)


app.listen(PORT, ()=>{
    console.log("Server running")
})