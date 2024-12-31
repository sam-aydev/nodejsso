require("dotenv").config()
const express = require("express")
const authRoutes = require("./routes/auth-routes")
const homeRoutes = require("./routes/home-routes")
const connectToDb = require("./database/db")
const app = express()


app.get("/", (req, res)=>{
    res.send("hello")
})
const PORT = process.env.PORT ?? 3000

connectToDb()
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/home", homeRoutes )

app.listen(PORT, ()=>{
    console.log("Server running")
})