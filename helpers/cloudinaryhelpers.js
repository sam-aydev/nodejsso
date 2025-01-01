const cloudinary = require("../config/cloudinary")
const uploadToCloudinary = async(filePath)=>{
    try {
           
    // Upload an image
     const uploadResult = await cloudinary.uploader.upload(filePath)
   
  
        console.log(uploadResult);
        
        return{
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id
        }
     } catch (error) {
        console.error(error)
    }
}

module.exports = {uploadToCloudinary}