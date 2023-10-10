const router = require("express").Router();
const upload = require("../middlewares/uploader");
const Product = require("../controllers/productController");

router.post("/", upload.single("imageUrl"), Product.createProduct);
router.get("/", Product.findProducts);
router.get("/:id", Product.findProductById);
router.patch("/:id", Product.updateProduct);
router.delete("/:id", Product.deleteProduct);

module.exports = router;
