const { Product } = require("../models");
const imagekit = require("../libs/imageKit");

const createProduct = async (req, res) => {
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
    res.status(400).json({ status: "failed" });
  }
};
const findProducts = async (req, res) => {
  try {
    const newProduct = await Product.findAll();

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {}
};

const findProductById = async (req, res) => {
  try {
    const condition = {
      where: {
        id: req.params.id,
      },
    };
    const newProduct = await Product.findOne(condition);
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {}
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
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {}
};

const deleteProduct = async (req, res) => {
  try {
    const condition = {
      where: {
        id: req.params.id,
      },
    };
    const newProduct = await Product.destroy(condition);
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {}
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
