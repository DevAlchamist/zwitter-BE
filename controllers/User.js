const userModel = require("../models/User");

const fetchUserById = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await userModel.findById(id).exec();

    res.status(200).json({
      id: user.id,
      username: user.username,
      name: user.name,
    });
  } catch (error) {}
};

module.exports = { fetchUserById };
