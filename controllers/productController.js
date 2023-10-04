const { Product } = require("../models");

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const newProduct = await Product.create({ name, price, stock });

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {}
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
