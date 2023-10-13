const jwt = require("jsonwebtoken");
const { User, Auth } = require("../models");
const ApiError = require("../utils/apiError");
const dotenv = require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!bearerToken) {
      next(new ApiError("Invalid token", 400));
    }
    const token = bearerToken.split("Bearer ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id, {
      include: ["Auth"],
    });
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next(new ApiError("Unauthorized", 400));
  }
};
