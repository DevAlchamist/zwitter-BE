const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  postId: {
    type: Schema.Types.ObjectId,
  },
});

const commentsModel = model("Comment", commentsSchema);
module.exports = commentsModel;
