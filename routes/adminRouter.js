const router = require("express").Router();
const upload = require("../middlewares/uploader");
const Admin = require("../controllers/adminController");

router.get("/", Admin.dashboardPage);
router.get("/create", Admin.createPage);
router.post("/create", upload.single("imageUrl"), Admin.createProduct);
// router.get("/:id", Product.findProductById);
// router.patch("/:id", Product.updateProduct);
// router.delete("/:id", Product.deleteProduct);

module.exports = router;
