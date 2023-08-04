const {Router} = require("express");

const router = Router();

const controller = require('../controllers/authController')

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/logout", controller.logout);

module.exports = router;