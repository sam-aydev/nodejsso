const Image = require("../models/Image")
const { uploadToCloudinary} = require("../helpers/cloudinaryhelpers")

const uploadImage = async(req, res)=> {
    try {
        if(!req.file){
            return res.json({
                success: false,
                messgae: "File is required, please upload!"
            })
        }

        const {url, publicId} = await uploadToCloudinary(req.file.path)
        const uploadedImage = await Image.create({
            url, 
            publicId,
            uploadedBy: req.userInfo.userId
        })
        if(uploadedImage){
            res.status(200).json({
                success: true,
                message: "Imaged uploaded",
                image: uploadedImage
            })
            console.log(uploadedImage)
        }
        
    } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                mesaage: "Something went wrong!"
            })
    }
}

module.exports={
    uploadImage
}