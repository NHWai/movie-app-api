let Movies = require("../models/Movies.js");

const getAllMovies = async () => {
  return Movies.find();
};

const getMovieById = async (movieId) => {
  return Movies.findById(movieId);
};

const getMovieByTitle = async (titleName) => {
  //finding movies with movietitle using Regular Expression
  // Using Regular Expression can delay the query performance if there is too much data
  return Movies.find({
    title: {
      $regex: titleName,
      $options: "i",
    },
  });
};

const saveMovie = async (movie) => {
  const newMovie = new Movies(movie);
  return newMovie.save();
};

const updateMovie = async (movideId, movie) => {
  return Movies.findByIdAndUpdate(movideId, movie, { new: true });
};

const deleteMovie = async (movideId) => {
  return Movies.findByIdAndDelete(movideId);
};

const findMovieByDirector = async (directorName) => {
  // quering main model (movies) by embedded model (director)
  return Movies.find({
    "director.name": {
      $regex: directorName,
      $options: "i",
    },
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  saveMovie,
  updateMovie,
  deleteMovie,
  findMovieByDirector,
};
