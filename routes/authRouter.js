const router = require("express").Router();
const Auth = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/checktoken", authenticate, checkRole("Owner"), Auth.checkToken);

module.exports = router;
