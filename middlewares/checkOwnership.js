const { Shop, Product } = require("../models");
const ApiError = require("../utils/apiError");

const checkOwnership = async (req, res, next) => {
  const userId = req.user.id;
  const query = {
    where: {
      id: req.params.id,
    },
  };
  try {
    const shop = await Shop.findOne(query);
    console.log("userId:", userId);
    console.log("shopUserId", shop.userId);
    if (!shop) {
      next(new ApiError("User not shop owner"));
    }
    const isSameUserId = shop.userId === userId;
    if (!isSameUserId) {
      next(new ApiError("User not this shop owner"));
    }
    next();
  } catch (err) {
    next(new ApiError("Internal server error"));
  }
};

module.exports = checkOwnership;
