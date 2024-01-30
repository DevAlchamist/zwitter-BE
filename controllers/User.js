const userModel = require("../models/User");
const { dataUri } = require("../middlewares/Multer");
const {
  uploadOnCloudinary,
  deleteOnCloudinary,
} = require("../utils/cloudinary");

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
      followersIds: user.followersIds,
      createdAt: user.createdAt,
      bio: user.bio,
      profileImage: user.profileImage,
      coverImage: user.coverImage,
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

const updateUser = async (req, res) => {
  const { userId, bio, followingUserId, followed } = req.body;

  if (!userId) {
    return res.status(404).json("userId not specified");
  }

  // making a query to get that if user followed or unFollowed

  try {
    let updateFollowingQuery = {};
    let updateFollowerQuery = {};
    if (followingUserId !== undefined) {
      if (followed !== undefined) {
        if (followed) {
          updateFollowerQuery = {
            $addToSet: { followersIds: userId },
          };
          updateFollowingQuery = {
            $addToSet: { followingIds: followingUserId },
          };
        } else {
          updateFollowerQuery = {
            $pull: { followersIds: userId },
          };
          updateFollowingQuery = {
            $pull: { followingIds: followingUserId },
          };
        }
      }
    }

    // updating the user following if user following

    const user = await userModel.findByIdAndUpdate(
      userId,
      updateFollowingQuery,
      {
        new: true,
      }
    );

    // updating the user you followed (followers) if user unFollowing

    const updatedUserDetail = await userModel.findByIdAndUpdate(
      followingUserId,
      updateFollowerQuery,
      {
        new: true,
      }
    );

    // saving in cloudinary and using of multer and dataUri to the buffer into string

    if (req.files) {
      let file;
      let imageFieldToUpdate;

      if (req.files.profileImage) {
        imageFieldToUpdate = "profileImage";
        file = dataUri(req.files.profileImage).content;
      } else if (req.files.coverImage) {
        imageFieldToUpdate = "coverImage";
        file = dataUri(req.files.coverImage).content;
      }
      const image = await uploadOnCloudinary(file, imageFieldToUpdate);

      if (imageFieldToUpdate === "profileImage") {
        if (user.profileImage.url) {
          deleteOnCloudinary(user.profileImage.urlId, imageFieldToUpdate);
        }

        user.profileImage.url = image.secure_url;
        user.profileImage.urlId = image.public_id;
      } else if (imageFieldToUpdate === "coverImage") {
        if (user.coverImage.url) {
          deleteOnCloudinary(user.coverImage.urlId, imageFieldToUpdate);
        }

        user.coverImage.url = image.secure_url;
        user.coverImage.urlId = image.public_id;
      }
    }

    if (bio !== undefined) user.bio = bio;

    if (followingUserId !== undefined) {
      const updatedUser = await updatedUserDetail.save();
      res.status(200).json(updatedUser);
    } else {
      if (!user) {
        return;
      }
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { fetchUserById, fetchAllUser, updateUser };
