const router = require("express").Router();
const shopController = require("../controllers/shopController");
const checkOwnership = require("../middlewares/checkOwnership");
const authenticate = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router
  .route("/")
  .get(authenticate, checkRole("Owner"), shopController.findAllShop)
  .post(authenticate, checkRole("Owner"), shopController.createShop);
router
  .route("/:id")
  .get(authenticate, checkRole("Owner"), shopController.findOneShopById)
  .patch(
    authenticate,
    checkRole("Owner"),
    checkOwnership,
    shopController.findOneShopById,
    shopController.updateShop
  )
  .delete(
    authenticate,
    checkRole("Owner"),
    checkOwnership,
    shopController.findOneShopById,
    shopController.deleteShop
  );

module.exports = router;
