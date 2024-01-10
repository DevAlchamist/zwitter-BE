const commentsModel = require("../models/Comments");
const postModel = require("../models/Post");

const createComment = async (req, res) => {
  const { postId, userId, body } = req.body;

  try {
    const comment = new commentsModel({ body, postId, userId });
    const doc = await comment.save();

    await postModel.findByIdAndUpdate(
      postId,
      { $push: { comments: doc._id } },
      { new: true }
    );

    const result = await doc.populate({
      path: "userId",
      select: "username",
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const fetchCommentById = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await commentsModel
      .find({ postId })
      .populate({
        path: "userId",
        select: "username",
      })
      .exec();
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createComment, fetchCommentById };
