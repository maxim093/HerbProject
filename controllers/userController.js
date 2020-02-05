const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");

// Register Form
exports.register = async (req, res, next) => {
  // VALIDATE THE DATA
  const { error } = registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .render("registration-form", { message: error.details[0].message });

  // CHECKING IF THE USER IS ALREADY IN DATABASE
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .render("registration-form", { message: "Email-bereits vorhanden" });

  // HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE A NEW USER
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.render("registration-form", {
      message: "Erfolgreich registriert!"
    });
  } catch (err) {}
};

exports.registerForm = async (req, res) => {
  res.render("registration-form");
};

exports.login = async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .render("userPage", { message: error.details[0].message });
  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email nicht gefunden");
  //Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).render("userPage", { message: "Falsches Passwort" });

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).render("userPage", {
    userId: user._id,
    user: user.name,
    message: "Erfolgreich eingeloggt!"
  });
};
