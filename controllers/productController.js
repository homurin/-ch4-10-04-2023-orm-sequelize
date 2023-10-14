const { Product } = require("../models");
const imagekit = require("../libs/imageKit");
const ApiError = require("../utils/apiError");

const createProduct = async (req, res, next) => {
  const { name, price, stock, shopId } = req.body;
  const file = req.file;
  const userId = req.user.id;
  let img;

  try {
    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }

    const newProduct = await Product.create({
      name,
      userId,
      shopId,
      price,
      stock,
      imageUrl: img,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
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
    console.log("tes");
    const product = await Product.findOne(condition);

    // if (!product) {
    //   next(new ApiError("Product not found", 404));
    // }
    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError(err.message, 500));
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
