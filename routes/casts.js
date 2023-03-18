const express = require("express");
const router = express.Router();
const CastController = require("../controller/casts-controller");
const auth = require("../middleware/auth");
/*
--GET METHOD---
"/" -> getAllCasts
"/movie/:movieId" ->getCastsByMovieId
":castId" -> getCastById

--POST METHOD---
"/"  --> saveCast

--PUT METHOD--
"/:castId" --> updateCast

--DELETE METHOD--
"/:castId" --> deleteCast
 */

router.get("/", CastController.getAllCasts);
router.get("/movie/:movieId", CastController.getCastsByMovieId);
router.get("/:castId", CastController.getCastById);

router.post("/", auth.verifyUserToken, CastController.newCast);

router.put("/:castId", auth.verifyUserToken, CastController.updateCast);

router.delete("/:castId", auth.verifyUserToken, CastController.deleteCast);
module.exports = router;
