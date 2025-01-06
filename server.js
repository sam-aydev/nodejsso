require("dotenv").config()
const express = require("express")
const authRoutes = require("./routes/auth-routes")
const homeRoutes = require("./routes/home-routes")
const connectToDb = require("./database/db")
const adminRoutes = require("./routes/admin-routes")
const imageRoutes = require("./routes/image-routes")
const productRoutes = require("./routes/product-routes")
const bookRoutes = require("./routes/book-routes")
const http = require("http")
const socketio = require("socket.io")
const app = express()



const server = http.createServer(app)
const io = socketio(server)
app.use(express.static("public"))

const users = new Set()
io.on("connection", (socket)=> {
    console.log("User is now connected");


    // handle when they join chat
    socket.on("join", (userName)=>{
        user.add(userName)

        // broadcast to all users
        io.emit("userJoined", userName)

        // Send updated userlist to clients
        io.emit("usersList", Array.from(users))
    })


})
app.get("/", (req, res)=>{
    res.send("hello")
})
const PORT = process.env.PORT ?? 3001

connectToDb()
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/home", homeRoutes )
app.use("/api/admin", adminRoutes)
app.use("/api/image", imageRoutes)
app.use("/api/product", productRoutes)
app.use("/api/books", bookRoutes)



app.listen(PORT, ()=>{
    console.log("Server running")
})