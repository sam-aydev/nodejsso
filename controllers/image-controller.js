const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryhelpers");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        messgae: "File is required, please upload!",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);
    const uploadedImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });
    if (uploadedImage) {
      res.status(200).json({
        success: true,
        message: "Imaged uploaded",
        image: uploadedImage,
      });
      console.log(uploadedImage);
      fs.unlinkSync(req.file.path);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      mesaage: "Something went wrong!",
    });
  }
};

const fetchImage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1 
    const totalImages = await Image.countDocuments()
    const totalPages = Math.ceil(totalImages/limit)

    const sortObj = {}
    sortObj[sortBy]= sortOrder
    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if (images) {
      res.status(200).json({
        success: true,
        data: images,
        currentPages: page,
        totalImages: totalImages,
        totalPages
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteImage = async (req, res) => {
  try {
    const currentImageId = req.params.id;
    const userId = req.userInfo.userId;
    console.log(currentImageId);

    const image = await Image.findById(currentImageId);
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image not found",
      });
    }

    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        messgae: "You are not unatuthorized",
      });
    }
    await cloudinary.uploader.destroy(image.publicId);
    await Image.findByIdAndDelete(currentImageId);
    res.status(200).json({
      success: true,
      message: "image deleted!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImage,
  fetchImage,
  deleteImage,
};
