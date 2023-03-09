const UserService = require("../service/UserService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const registerUser = async (req, res, next) => {
  let username = req.body["username"];
  let password = req.body["password"];
  let role = req.body["role"];

  try {
    const user = await UserService.register(username, password, role);
    const payload = { id: user._id };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    return res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: "Cannot register the user" });
  }
};

const login = async (req, res, next) => {
  let username = req.body["username"];
  let password = req.body["password"];
  try {
    const user = await UserService.login(username, password);

    const payload = { id: user._id };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    return res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: "Invalid user" });
  }
};

module.exports = { registerUser, login };
