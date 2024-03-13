const express = require("express");
const {
  createUser,
  loginUser,
  checkUser,
  logoutUser,
  resetPasswordReq,
  resetPassword,
} = require("../controllers/Auth");
const passport = require("passport");

const router = express.Router();

router.get("/check", passport.authenticate("jwt"), checkUser);
router.get("/logout", logoutUser);
router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.post("/reset-password-req", resetPasswordReq) 
router.post("/reset-password", resetPassword)

module.exports = router;
