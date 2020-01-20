const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Require controller modules.
var user_controller = require("../controllers/userController");

// register
router.post("/registrieren", user_controller.register);

router.get("/registrieren", user_controller.registerForm);

router.get("/login", user_controller.login);

module.exports = router;
