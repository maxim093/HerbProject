const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Require controller modules.
var user_controller = require("../controllers/userController");

// register
router.get("/register", user_controller.register);

module.exports = router;
