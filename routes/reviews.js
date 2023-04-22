const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ReviewsController = require("../controller/reviews-controller.js");

// router.get("/:movieId", ReviewsController.getReviewsById);
router.post("/:movieId", auth.verifyUserToken, ReviewsController.newReview);

router.get("/:movieId", ReviewsController.getReviewsByMovieId);

module.exports = router;
