const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      //   required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "Hey ! I am a new User",
    },
    coverImage: {
      url: {
        type: String,
      },
      urlId: {
        type: String,
      },
    },
    profileImage: {
      url: {
        type: String,
      },
      urlId: {
        type: String,
      },
    },
    followingIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followersIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const userModel = model("User", userSchema);

module.exports = userModel;
