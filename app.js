const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://samuel:samuel@cluster0.fbbjc.mongodb.net/something").then(() => console.log("Database connected!")).catch((e)=> console.log(e))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("User", userSchema)

async function runQueries(){
    try{
        const newUser = await User.create({
            name: "Sollo hus",
            email: "solo@gmail.com",
            age: 30,
            isActive: true,
            tags: ["Sami", "jusap"],
            
        })
        const getUserId = await User.findById(newUser._id)

        console.log(getUserId)
    }catch(e){
        console.log(e)
    }finally{
        mongoose.connection.close()
    }
}
runQueries()