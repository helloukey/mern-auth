const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3 days",
  });
};

// Handle Form Errors
const handleFormErrors = (err) => {
  let errors = { firstName: "", lastName: "", email: "", password: "" };

  // incorrect login email
  if (err.message === "incorrect email") {
    errors.email = "Sorry, this email is not registered.";
  }

  // incorrect login password
  if (err.message === "incorrect password") {
    errors.password = "Sorry, incorrect password.";
  }

  // duplicate errors
  if (err.code === 11000) {
    errors.email = "This email is already taken.";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Register POST request
const registerPOST = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({ firstName, lastName, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      // httpOnly: true,
      // domain: ".onrender.com",
      // sameSite: "none",
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleFormErrors(err);
    res.status(400).json({ errors });
    // console.log({errors});
  }
};

// Login POST request
const loginPOST = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      // httpOnly: true,
      // domain: ".onrender.com",
      // sameSite: "none",
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleFormErrors(err);
    res.status(400).json({ errors });
    // console.log({ errors });
  }
};

// Check User
const checkUserGET = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      User.findById(decodedToken.id).then((user) => {
        if (err) {
          res.status(201).json({ authorized: false });
        } else {
          res
            .status(201)
            .json({
              authorized: true,
              firstName: user.firstName,
              lastName: user.lastName,
            });
        }
      });
    });
  } else {
    res.status(201).json({ authorized: false });
  }
};

// Logout Action
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  try {
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ firstName, lastName, email }, { password });
    await user.save();
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).json({error: "Invalid credentials."});
  }
}


module.exports = {
  registerPOST,
  loginPOST,
  checkUserGET,
  logout,
  resetPassword
};
