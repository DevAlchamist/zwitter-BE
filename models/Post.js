const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxLength: 280,
  },
  likedIds: [
    {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref:'Comments'
    },
  ],
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = model("Post", postSchema);

module.exports = postModel;
