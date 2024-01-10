const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  body: {
    type: String,
    required: true,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const commentsModel = model("Comment", commentsSchema);
module.exports = commentsModel;
