const express = require("express");
const {
  fetchAllPosts,
  createPost,
  updatePost,
  fetchPostById,
} = require("../controllers/Post");

const router = express.Router();

router.get("/", fetchAllPosts);
router.get("/:id", fetchPostById);
router.post("/", createPost);
router.put("/update", updatePost);

module.exports = router;
