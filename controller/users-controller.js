const UserService = require("../service/UserService");
const jwt = require("jsonwebtoken");
const moment = require("moment");
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const registerUser = async (req, res, next) => {
  let username = req.body["username"];
  let password = req.body["password"];
  let role = req.body["role"];

  try {
    const user = await UserService.register(username, password, role);
    const payload = { id: user._id };
    const tokenStr = jwt.sign(payload, secret, { expiresIn: "1h" });

    // Calculate the expiration time for the token (50 minutes from now)
    const expirationTime = moment().add(50, "minutes").toISOString();
    const token = {
      tokenStr,
      id: user._id,
      username,
      expirationTime,
    };
    return res.status(200).json(token);
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
    const tokenStr = jwt.sign(payload, secret, { expiresIn: "1h" });
    // Calculate the expiration time for the token (50 minutes from now)
    const expirationTime = moment().add(50, "minutes").toISOString();
    const token = {
      tokenStr,
      id: user._id,
      username,
      expirationTime,
    };
    return res.status(200).json(token);
  } catch (err) {
    res.status(401).json({ message: "Invalid user" });
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserService.getUserById(userId);
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { registerUser, login, getUserById };
