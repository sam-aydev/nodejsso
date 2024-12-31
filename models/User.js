const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"], 
        trim: true,
        unique: true,
        maxLength: [20, "Username cannot be more than 20"]
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        trim: true,
        unique: true,
        maxLength: [40, "Email cannot be more than 40"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"], 
        trim: true,
        minLength: [6, "password must be more than 6 characters"],

    },
    role: {
        type: String,
        enum : ["user", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        trim: true,
        default: Date.now()
    }
})

module.exports = mongoose.model("User", UserSchema)