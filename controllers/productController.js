const { Product } = require("../models");
const imagekit = require("../libs/imageKit");
const ApiError = require("../utils/apiError");

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const file = req.file;
  const split = file.originalname.split(".");
  const extension = split[split.length - 1];

  // upload to imagekit

  try {
    const newProduct = await Product.create({ name, price, stock });
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const findProducts = async (req, res, next) => {
  try {
    const newProduct = await Product.findAll();

    res.status(200).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const findProductById = async (req, res, next) => {
  try {
    const condition = {
      where: {
        id: req.params.id,
      },
    };

    const product = await Product.findOne(condition);

    if (!product) {
      next(new ApiError("Product not found", 404));
    }
    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    if (error.name == "SequelizeDatabaseError") {
      return next(new ApiError(`Bad request`, 400));
    }
    next(new ApiError(error.message, 400));
  }
};

const updateProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const condition = {
      where: {
        id: req.params.id,
      },
    };
    const newProduct = await Product.update({ name, price, stock }, condition);
    if (!newProduct) {
      next(new ApiError("Product not found"), 404);
    }
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
    next(new Error(error.message, 400));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const condition = {
      where: {
        id: req.params.id,
      },
    };
    const product = await Product.destroy(condition);
    if (!product) {
      next(new ApiError("Product not found", 404));
    }
    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(new ApiError("Internal server error", 500));
  }
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
