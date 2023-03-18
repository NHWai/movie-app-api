const express = require("express");
const router = express.Router();
const MoviesController = require("../controller/movies-controller");
const auth = require("../middleware/auth");

router.get("/", MoviesController.getAllMovie);
router.get("/:movieId", MoviesController.getMovieById);
router.get("/title/:title", MoviesController.findMovieByTitle);
router.get("/director/:director", MoviesController.findMovieByDirector);

router.post("/", auth.verifyUserToken, MoviesController.newMovie);

router.put("/:movieId", auth.verifyUserToken, MoviesController.updateMovie);

router.delete("/:movieId", auth.verifyUserToken, MoviesController.deleteMovie);

module.exports = router;
