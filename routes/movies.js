const express = require("express");
const router = express.Router();
const MoviesController = require("../controller/movies-controller");

router.get("/", MoviesController.getAllMovie);
router.get("/:movieId", MoviesController.getMovieById);
router.get("/title/:title", MoviesController.findMovieByTitle);
router.get("/director/:director", MoviesController.findMovieByDirector);

router.post("/", MoviesController.newMovie);

router.put("/:movieId", MoviesController.updateMovie);

router.delete("/:movieId", MoviesController.deleteMovie);

module.exports = router;
