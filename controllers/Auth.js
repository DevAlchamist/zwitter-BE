require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const crypto = require("crypto");
const { ResetSuccess, sendMail, ResetReq } = require("../common/common");

const createUser = async (req, res) => {
  const { name, email, username, password } = req.body;

  const findUser = await userModel.findOne({ username: username });
  const findUserEmail = await userModel.findOne({ email: email });

  if (findUser || findUserEmail) {
    return res.json({ message: "User already exists" });
  }
  const user = new userModel({ name, username, password, email });

  try {
    const doc = await user.save();
    const token = jwt.sign(
      { name, username, id: user.id, email: user.email },
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
      httpOnly: true,
    })
    .status(201)
    .json({
      id: user.id,
      name: user.name,
      username: user.username,
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
      httpOnly: true,
    })
    .sendStatus(200);
};

const resetPasswordReq = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const user = await userModel.findOne({ email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();
    const resetPageLink =
      "http://localhost:5173/reset-password?token=" + token + "&email=" + email;
    const subject = "reset password for shop pulse";
    const html = ResetReq(resetPageLink);

    if (email) {
      const response = await sendMail({
        to: email,
        subject: subject,
        html,
      });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

const resetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  console.log({ email, password, token });

  try {
    // Find user by email and reset token
    const user = await userModel.findOne({ email, resetPasswordToken: token });

    if (!user) {
      return res.sendStatus(400); // User not found or invalid token
    }

    // Update user's password and save
    user.password = password; // Save password as it is
    await user.save();

    // Send success email
    const subject = `Successfully changed password for shop pulse`;
    const html = ResetSuccess(email);
    await sendMail({ to: email, subject, html });

    res.sendStatus(200); // Password reset successful
  } catch (error) {
    console.error("Error resetting password:", error);
    res.sendStatus(500); // Internal server error
  }
};

module.exports = {
  resetPassword,
  resetPasswordReq,
  createUser,
  loginUser,
  checkUser,
  logoutUser,
};
