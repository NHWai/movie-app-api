let Reviews = require("../models/Reviews.js");
let Movies = require("../models/Movies.js");

const saveReview = async (review, movieRating, totalReviews, movieId) => {
  await Movies.findByIdAndUpdate(movieId, {
    totalRating: movieRating,
    totalReviews: totalReviews,
  });
  const newReview = new Reviews(review);
  return newReview.save();
};

const getReviewsByMovieId = async (movie) => {
  return await Reviews.find({ movieId: movie });
};

module.exports = { saveReview, getReviewsByMovieId };
