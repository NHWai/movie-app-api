const ReviewService = require("../service/ReviewService");
const Movies = require("../models/Movies.js");
const Reviews = require("../models/Reviews");

//Error Handler Function
const handle = (fn, httpErrorCode) => (req, res, next) => {
  return fn(req, res, next).catch((err) => {
    res.status(httpErrorCode).json({ message: err.message });
  });
};

const newReviewHandler = async (req, res, next) => {
  const { movieId } = req.params;
  const reqReview = {
    ...req.body,
    rating: Number(req.body.rating),
    movieId: movieId,
  };

  // calculate total rating
  const { rating: orginalRating } = await Movies.findById(movieId);
  const reviewRatings = (await Reviews.find({ movieId: movieId })).map(
    (review) => review.rating
  );
  let movieRating;
  if (reviewRatings.length > 0) {
    reviewRatings.push(reqReview.rating);
    movieRating = (
      reviewRatings.reduce(
        (accumulator, currVal) => accumulator + currVal,
        orginalRating
      ) /
      (reviewRatings.length + 1)
    ).toFixed(1);
  } else {
    movieRating = ((orginalRating + reqReview.rating) * 0.5).toFixed(1);
  }
  const newReview = await ReviewService.saveReview(
    reqReview,
    movieRating,
    movieId
  );
  if (!newReview) throw Error("Cannot create the review");
  const resBody = {
    meta: {
      id: newReview._id,
    },
    data: newReview,
  };
  return res.status(201).json(resBody);
};

const getReviewsByMovieIdHandler = async (req, res, next) => {
  const { movieId } = req.params;
  const allReviews = await ReviewService.getReviewsByMovieId(movieId);
  const resBody = {
    meta: { total: allReviews.length },
    data: allReviews,
  };
  return res.status(200).json(resBody);
};

const newReview = (req, res, next) =>
  handle(newReviewHandler, 400)(req, res, next);

const getReviewsByMovieId = (req, res, next) =>
  handle(getReviewsByMovieIdHandler, 400)(req, res, next);

module.exports = { newReview, getReviewsByMovieId };
