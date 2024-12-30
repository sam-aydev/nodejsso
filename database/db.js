const mongoose = require("mongoose")

const connectToDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://samuel:samuel@cluster0.fbbjc.mongodb.net/")
        // console.log("connected")
    } catch (error) {
        console.error("MongoDb connection", error)
        process.exit(1)
    }
}

module.exports = connectToDB