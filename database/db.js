const mongoose = require("mongoose")

const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected")
    } catch (error) {
        console.error("MongoDb connection", error)
        process.exit(1)
    }
}

module.exports = connectToDB