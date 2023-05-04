const express = require("express");

const router = express.Router();
const MoviesController = require("../controller/movies-controller");
const auth = require("../middleware/auth");
const upload = require("../config/uploadCloudinary");

router.get("/", MoviesController.getAllMovie);
router.get("/:movieId", MoviesController.getMovieById);
router.get("/title/:title", MoviesController.findMovieByTitle);
router.get("/genre/:genre", MoviesController.findMovieByGenre);
router.get("/userId/:userId", MoviesController.findMovieByUserId);
router.get("/director/:director", MoviesController.findMovieByDirector);

router.post("/", auth.verifyUserToken, upload.any(), MoviesController.newMovie);

router.put(
  "/:movieId",
  auth.verifyUserToken,
  upload.any(),
  MoviesController.updateMovie
);

router.delete(
  "/:movieId/photoid/:photoId",
  auth.verifyUserToken,
  MoviesController.deleteMovie
);

module.exports = router;
