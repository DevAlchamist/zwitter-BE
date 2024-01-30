const express = require("express");
const {
  createComment,
  fetchCommentByPostId,
  deleteComment,
} = require("../controllers/Comment");

const router = express.Router();

router.get("/:postId", fetchCommentByPostId);
router.post("/", createComment);
router.delete("/delete", deleteComment);

module.exports = router;
