const express = require("express");
const {
  fetchAllPosts,
  createPost,
  updatePost,
  fetchPostById,
  fetchUserAllPosts,
  deletePost,
} = require("../controllers/Post");
const { multerUploads } = require("../middlewares/Multer");

const router = express.Router();

router.get("/", fetchAllPosts);
router.get("/:id", fetchPostById);
router.get("/user/:id", fetchUserAllPosts);
router.post("/", multerUploads, createPost);
router.put("/update", updatePost);
router.delete("/delete", deletePost);

module.exports = router;
