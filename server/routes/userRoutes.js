const {Router} = require("express");

const router = Router();

const controller = require('../controllers/userController')

router.get("/", controller.getUsers);
router.get("/login", controller.login);
router.post("/register", controller.register);
router.get("/logout", controller.logout);
router.put("/", controller.updateUser);

module.exports = router;