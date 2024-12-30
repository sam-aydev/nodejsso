require("dotenv").config()
const express = require("express")
const connectToDb = require("./database/db")
const app = express()
app.get("/", (req, res)=>{
    res.send("hello")
})
const PORT = process.env.PORT ?? 3000

connectToDb()
app.use(express.json())


app.listen(PORT, ()=>{
    console.log("Server running")
})