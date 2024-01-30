const multer = require("multer");
const Datauri = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
  { name: "postImage", maxCount: 1 },
]);


const dataUri = (files) => {
  if (files && files.length > 0) {
    // console.log("files",files)
    return new Datauri().format(
      path.extname(files[0].originalname).toString(),
      files[0].buffer
    );
  }

  return null;
};

module.exports = { multerUploads, dataUri };
