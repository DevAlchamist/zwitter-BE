const express = require("express");
const { fetchUserById, fetchAllUser,updateUser } = require("../controllers/User");

const router = express.Router();

router.get("/", fetchAllUser);
router.get("/:id", fetchUserById);
router.put("/update", updateUser);

module.exports = router;
