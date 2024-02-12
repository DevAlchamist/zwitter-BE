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
      select: "username name profileImage",
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const fetchCommentByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await commentsModel
      .find({ postId })
      .populate({
        path: "userId",
        select: "username name profileImage",
      })
      .exec();
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Comment ID is required in the request body" });
    }

    await commentsModel.findByIdAndDelete(id).exec();

    await postModel
      .updateOne({ comments: id }, { $pull: { comments: id } })
      .exec();

    res.status(200).json({ deletedCommentId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createComment, fetchCommentByPostId, deleteComment };
