const router = require("express").Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.findAllUser)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.findOneUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
