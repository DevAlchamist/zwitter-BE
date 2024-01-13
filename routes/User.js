const express = require("express");
const {
  fetchUserById,
  fetchAllUser,
  updateUser,
} = require("../controllers/User");
const { multerUploads, dataUri } = require("../middlewares/Multer");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const router = express.Router();

router.get("/", fetchAllUser);
router.get("/:id", fetchUserById);
router.put("/update", multerUploads, updateUser);

// for testing purposes
// router.post("/upload", multerUploads, async (req, res) => {
//   // console.log(req.body);
//   console.log(req.files);
//   if (req.files) {
//     const file = dataUri(req.files.profileImage).content;
//     const image = await uploadOnCloudinary(file);
//     res.status(200).json(image);
//     // const imageUpload = uploadOnCloudinary(file);
//     // res.status(200).json(imageUpload);
//   }
// });

module.exports = router;
