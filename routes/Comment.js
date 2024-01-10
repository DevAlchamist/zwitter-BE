const express = require("express");
const { createComment, fetchCommentById } = require("../controllers/Comment");

const router = express.Router();


router.get('/:postId', fetchCommentById)
router.post('/', createComment)

module.exports = router;
