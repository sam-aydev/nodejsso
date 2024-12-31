const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const registerUser = async (req, res, next) => {
  try {
    const {username, email, password, role} = req.body;
    const checkExistingUser = await User.findOne({$or: [{username}, {email}]})

    if(checkExistingUser){
      return res.status(400).json({
        success: failed,
        message: "user already exists"
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password, salt)

    const newUserData = {
      username,
      email, 
      password: hashedPassword,
      role: role || "user"
    }
     
    const newUser = await User.create(newUserData);
    if (newUser) {
        console.log()
      res.status(201).json({
        success: true,
        data: newUser,
      });
      console.log(newUser)
    }
   return res.status(400).json({succes: false})
   
  } catch (error) {
    console.log("Error:" - error);
  }
};


const loginUser = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({
        success: failed,
        message: "user does not exists"
      })
    }else{
      const isPasswordMatched = await bcrypt.compare(password, user.password)
      if(isPasswordMatched){
        const accessToken = jwt.sign({
          userId: user.id,
          username: user.username,
          role: user.role
        }, process.env.JWT_SECRET_KEY, {
          expiresIn: "15m"
        })
        res.status(200).json({
          success: true,
          message: "Logged in succesful",
          accessToken
        })

      }else{
        return res.status(400).json({
          error: "The password is not correct!"
        })
      }
    }
    
     
   
    
  } catch (error) {
    console.log("Error:" - error);
  }
};



module.exports = {
  registerUser,
  loginUser
};
