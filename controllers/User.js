const userModel = require("../models/User");

const fetchUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id).exec();

    const result = await user.populate({
      path: "posts",
      select: " _id likedIds comments createdAt content",
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
      posts: user.posts,
      followingIds: user.followingIds,
      createdAt: user.createdAt,
    });
  } catch (error) {}
};

const fetchAllUser = async (req, res) => {
  let condition = {};

  let query = userModel.find(condition);

  const searchTerm = req.query.username;

  const regex = new RegExp(searchTerm, "i");

  if (searchTerm) {
    query = query.find({
      username: { $regex: regex },
    });
  }

  try {
    const docs = await query.exec();

    res.status(200).json(docs);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = { fetchUserById, fetchAllUser };
