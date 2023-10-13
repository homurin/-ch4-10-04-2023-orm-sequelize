const router = require("express").Router();
const upload = require("../middlewares/uploader");
const Product = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post(
  "/",
  authenticate,
  checkRole("Owner"),
  upload.single("imageUrl"),
  Product.createProduct
);
router.get("/", authenticate, checkRole("Owner"), Product.findProducts);
router.get("/:id", authenticate, checkRole("Owner"), Product.findProductById);
router.patch("/:id", authenticate, checkRole("Owner"), Product.updateProduct);
router.delete("/:id", authenticate, checkRole("Owner"), Product.deleteProduct);

module.exports = router;
