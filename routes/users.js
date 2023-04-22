const express = require("express");
const router = express.Router();
const UsersController = require("../controller/users-controller");

// router.get("/:userId", UsersController.getUserById);
router.post("/", UsersController.registerUser);
router.post("/login", UsersController.login);
router.get("/:userId", UsersController.getUserById);

module.exports = router;
