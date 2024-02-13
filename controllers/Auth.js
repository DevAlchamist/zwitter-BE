require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const createUser = async (req, res) => {
  const { name, username, password } = req.body;

  const findUser = await userModel.findOne({ username: username });

  if (findUser) {
    return res.json({ message: "User already exists" });
  }
  const user = new userModel({ name, username, password });

  try {
    const doc = await user.save();
    const token = jwt.sign(
      { name, username, id: user.id },
      process.env.JWT_SECRET_KEY
    );

    res
      .cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
        httpOnly: true,
      })
      .status(201)
      .json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  const user = req.user;
  res
    .cookie("jwt", user.token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })
    .status(201)
    .json({
      id: user.id,
      name: user.name,
      username: user.username,
      profileImage: user.profileImage,
    });
};

const checkUser = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401);
  }
};

const logoutUser = (req, res) => {
  res
    .cookie("jwt", null, {
      expires: new Date(Date.now()),
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })
    .sendStatus(200);
};

module.exports = { createUser, loginUser, checkUser, logoutUser };
