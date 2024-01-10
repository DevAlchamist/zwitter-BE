const postModel = require("../models/Post");
const userModel = require("../models/User");

const fetchAllPosts = async (req, res, next) => {
  const posts = await postModel
    .find({})
    .populate({ path: "user", select: "username name" });

  res.status(200).json(posts);
};

const createPost = async (req, res, next) => {
  const { id, content } = req.body;

  try {
    const post = new postModel({ user: id, content });
    const newPost = await post.save();

    await userModel.findByIdAndUpdate(
      id,
      { $push: { posts: newPost._id } },
      { new: true }
    );

    const result = await newPost.populate({
      path: "user",
      select: "username name",
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

const updatePost = async (req, res) => {
  // const { id, userId, liked } = req.body;
  const { id, userId, liked, comments, content } = req.body;

  if (userId !== undefined) {
    try {
      let updateQuery = {};

      if (liked) {
        updateQuery = {
          $addToSet: { likedIds: userId }, // Add userId to likedBy if liked is true
        };
      } else {
        updateQuery = {
          $pull: { likedIds: userId }, // Remove userId from likedBy if liked is false
        };
      }

      const updatedPost = await postModel.findByIdAndUpdate(
        id,
        {
          ...updateQuery,
        },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      const result = await updatedPost.populate({
        path: "user",
        select: "username name",
      });
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating post", error: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Invalid request: Missing userId or liked status" });
  }
};

const fetchPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel
      .findById(id)
      .populate({ path: "user", select: "username name" })
      .exec();

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

const fetchUserAllPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel
      .find({ user: id })
      .populate({ path: "user", select: "username name" })
      .exec();

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchAllPosts,
  createPost,
  updatePost,
  fetchPostById,
  fetchUserAllPosts,
};
