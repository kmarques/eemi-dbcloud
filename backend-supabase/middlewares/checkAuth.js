const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = function (options = {}) {
  return async (req, res, next) => {
    // 1) Check authorization header with Bearer type
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      if (options.block === false) return next();
      return res.sendStatus(401);
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
      if (options.block === false) return next();
      return res.sendStatus(401);
    }
    // 2) Check if token is a valid not expired JWT token
    const userFromToken = jwt.verify(token, "secret-key");
    // 3) Reload User from database with user_id presents in the JWT payload part
    const user = await User.findByPk(userFromToken.user_id);
    req.user = user;

    next();
  };
};
