const { Shop } = require("../models");
const ApiError = require("../utils/apiError");

const findAllShop = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({ include: ["Products"] });
    res.status(200).json({
      status: "ok",
      data: shops,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

const findOneShopById = async (req, res, next) => {
  try {
    const query = {
      where: {
        id: req.params.id,
      },
    };
    const shop = await Shop.findOne(query);
    if (shop === null) {
      next(new ApiError("Shop not found", 404));
      return;
    }
    res.status(200).json({
      status: "ok",
      data: shop,
    });
  } catch (err) {
    next(new ApiError("Internal server error", 500));
  }
};

const createShop = async (req, res, next) => {
  try {
    const { name, productId } = req.body;
    const userId = req.user.id;

    const newShop = await Shop.create({ name, productId, userId });
    res.status(201).json({
      status: "created",
      data: newShop,
    });
  } catch (err) {
    next(new ApiError("Internal server error", 500));
  }
};

const updateShop = async (req, res, next) => {
  try {
    const { name, productId, userId } = req.body;
    const query = {
      where: {
        id: req.params.id,
      },
    };
    const shop = await Shop.findOne(query);
    if (shop === null) {
      next(new ApiError("Shop not found", 404));
      return;
    }

    const editedShop = await Shop.update({ name, productId, userId }, query);
    res.status(201).json({
      status: "created",
      data: editedShop,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

const deleteShop = async (req, res, next) => {
  try {
    const query = {
      where: {
        id: req.params.id,
      },
    };

    const shop = await Shop.findOne(query);

    if (shop === null) {
      next(new ApiError("Shop not found", 404));
      return;
    }

    const deletedShop = await Shop.destroy(query);

    res.status(201).json({
      status: "success",
      data: deletedShop,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

module.exports = {
  findAllShop,
  findOneShopById,
  createShop,
  updateShop,
  deleteShop,
};
