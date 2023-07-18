const {Router} = require("express");

const router = Router();

const controller = require('../controllers/userController')

router.get("/", controller.getUsers);
router.post("/", controller.setUser);
router.put("/", controller.updateUser);

module.exports = router;