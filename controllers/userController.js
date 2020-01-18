var User = require("../models/user");

// Register Form
exports.register = async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();
    res.render("login-form", {
      message: "Erfolgreich registriert!",
      name: "",
      email: "",
      password: ""
    });
  } catch (err) {
    res.render("login-form", { message: "Email-bereits vorhanden" });
  }
};

exports.registerForm = async (req, res) => {
  res.render("login-form");
};
