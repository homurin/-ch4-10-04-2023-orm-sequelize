const router = require("express").Router();
const Product = require("./productRouter");
const Admin = require("./adminRouter");

router.use("/api/v1/products", Product);
router.use("/dashboard", Admin);

module.exports = router;
