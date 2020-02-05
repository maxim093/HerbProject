const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verify = require("../controllers/verifyToken");

// Require controller modules.
var user_controller = require("../controllers/userController");

// register
router.post("/registrieren", user_controller.register);

router.get("/registrieren", user_controller.registerForm);

router.post("/login", user_controller.login);

router.get("/", verify, (req, res) => {
  // Access on user id in all routes with token
  res.send(req.user);
});

module.exports = router;
