const express = require("express");
const { fetchUserById, fetchAllUser } = require("../controllers/User");

const router = express.Router();

router.get("/", fetchAllUser);
router.get("/:id", fetchUserById);

module.exports = router;
