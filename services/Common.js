const passport = require("passport");

const cookieExtractor = function (req, res, next) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const isAuth = function (req, res, next) {
  return passport.authenticate("jwt");
};

module.exports = { cookieExtractor, isAuth };
