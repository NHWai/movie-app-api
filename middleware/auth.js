const jwt = require("jsonwebtoken");
let Users = require("../models/Users");

require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const verifyUserToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).send("Access Denied/ Unauthorized request");

  try {
    const [type, tokenstr] = token.split(" ");
    if (type !== "Bearer") return res.status(401).send("Unauthorized request");

    if (tokenstr === null || !tokenstr)
      return res.status(401).send("Unauthorized request");

    const verifiedUser = jwt.verify(tokenstr, secret);

    if (!verifiedUser) return res.status(401).send("Unauthorized request");

    //validating login-user is one of the users in the userlist in database
    const { id } = verifiedUser;

    const user = await Users.findById(id);
    if (!user) {
      res.status(401).send("Unauthorized request");
    }

    req.user = { id: user._id };
    next();
  } catch (err) {
    res.status(401).send("Access Denied/ Unauthorized request");
  }
};

module.exports = { verifyUserToken };
