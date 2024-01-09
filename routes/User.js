const express = require("express");
const { fetchUserById } = require("../controllers/User");

const router = express.Router();

router.get("/own", fetchUserById);

module.exports = router;
