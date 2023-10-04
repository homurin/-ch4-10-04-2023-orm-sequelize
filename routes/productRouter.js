const router = require("express").Router();

const Product = require("../controllers/productController");

router.get("/", Product.findProducts);
router.get("/:id", Product.findProductById);
router.patch("/:id", Product.updateProduct);
router.delete("/:id", Product.deleteProduct);
router.post("/", Product.createProduct);
module.exports = router;
