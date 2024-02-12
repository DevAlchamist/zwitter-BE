require("dotenv").config();
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folder,
      resource_type: "auto",
    });
    try {
      return response;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    return null;
  }
};

const deleteOnCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.api.delete_resources([`${publicId}`], {
      type: "upload",
      resource_type: "image",
    });
    try {
      return response;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    return null;
  }
};

module.exports = { uploadOnCloudinary, deleteOnCloudinary };
