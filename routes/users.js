var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  const users = [
    {
      name: "nhw",
      id: 1,
    },
    {
      name: "wma",
      id: 2,
    },
    {
      name: "hnit",
      id: 3,
    },
  ];
  res.json(users);
});

module.exports = router;
