const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const verifyUserToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).send("Access Denied/ Unauthorized request");

  try {
    const [type, tokenstr] = token.split(" ");

    // if (type !== "Bearer") return res.status(401).send("Unauthorized request");

    if (tokenstr === null || !tokenstr)
      return res.status(401).send("Unauthorized request");

    const verifiedUser = jwt.verify(tokenstr, secret);

    if (!verifiedUser) return res.status(401).send("Unauthorized request");

    req.user = verifiedUser; //userId
    next();
  } catch (err) {
    res.status(401).send("Access Denied/ Unauthorized request");
  }
};

module.exports = { verifyUserToken };

/*
//Valid Users
 {
    "username":"nhwai",
    "password":"nhw997"
  },
  {
    "username":"mgmg",
    "password":"mgmg97"
  },
  {
    "username":"komg",
    "password":"koko97"
  }
*/
