const { default: mongoose } = require("mongoose");
const Casts = require("../models/Casts");

const getAllCasts = async () => {
  //We are not populating movie model in getAllReviews bcuz it is bad for the performance
  return Casts.find();
};

const saveCast = async (cast) => {
  const newCast = new Casts({
    // setting movie as ObjectId
    movie: mongoose.Types.ObjectId(cast.movie),
    protagonist: cast.protagonist,
    allie_rival: cast.allie_rival,
  });
  await newCast.save();
  // populate with "movie" bcuz in Cast Model "movie" is set as Foregin Key
  // return newCast.populate("movie");
  return newCast;
};

const getCastsByMovieId = async (movieId) => {
  return Casts.find({ movie: movieId });
};

const getCastById = async (castId) => {
  return Casts.findById(castId).populate("movie");
};

const updateCast = async (castId, cast) => {
  cast.movie = mongoose.Types.ObjectId(cast.movie);
  return Casts.findByIdAndUpdate(castId, cast, { new: true }).populate("movie");
};

const deleteCast = async (castId) => {
  return Casts.findByIdAndDelete(castId);
};

module.exports = {
  getAllCasts,
  saveCast,
  getCastsByMovieId,
  getCastById,
  updateCast,
  deleteCast,
};
