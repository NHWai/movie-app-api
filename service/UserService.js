let Users = require("../models/Users");
const bcrypt = require("bcrypt");

const register = async (username, password, role) => {
  //generatig salt using bcrypt
  const salt = await bcrypt.genSalt(10);

  //hashing password with salt using bcrypt
  const hashPassword = await bcrypt.hash(password, salt);

  //registering a user
  const user = new Users({
    username: username,
    password: hashPassword,
    role: role,
  });
  return user.save();
};

const login = async (username, password) => {
  const filter = { username };
  const user = await Users.findOne(filter);

  if (user) {
    const validPass = await bcrypt.compare(password, user.password);

    if (validPass) {
      return user;
    } else {
      throw Error("Invalid username or password");
    }
  }
  throw Error("Invalid user or password");
};

const getUserById = async (userId) => {
  return Users.findById(userId);
};

module.exports = {
  register,
  login,
  getUserById,
};
