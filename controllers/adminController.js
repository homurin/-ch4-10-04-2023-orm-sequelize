const { Product } = require("../models");
const imagekit = require("../libs/imageKit");

const dashboardPage = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render("index", { products });
  } catch (err) {
    res.render("index");
  }
};
const createPage = async (req, res) => {
  try {
    res.render("create");
  } catch (err) {
    res.render("index");
  }
};

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const file = req.file;
  const split = file.originalname.split(".");
  const extension = split[split.length - 1];
  console.log(file);
  // upload to imagekit

  try {
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });
    console.log(img);
    const newProduct = await Product.create({
      name,
      price,
      stock,
      imageUrl: img.url,
    });
    res.redirect("/dashboard");
  } catch (error) {
    res.status(400).json({ status: "failed" });
  }
};

module.exports = {
  dashboardPage,
  createPage,
  createProduct,
};
