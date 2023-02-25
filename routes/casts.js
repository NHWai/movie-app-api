const express = require("express");
const router = express.Router();
const CastController = require("../controller/casts-controller");

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

router.post("/", CastController.newCast);

router.put("/:castId", CastController.updateCast);

router.delete("/:castId", CastController.deleteCast);
module.exports = router;
