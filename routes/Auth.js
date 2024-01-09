const express = require("express");
const { createUser, loginUser, checkUser, logoutUser } = require("../controllers/Auth");
const passport = require("passport");

const router = express.Router();

router.get("/check", passport.authenticate("jwt"), checkUser);
router.get("/logout", logoutUser);
router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"), loginUser);

module.exports = router;
