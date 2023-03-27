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
      $options: "i", //disable case sensitive
    },
  });
};

const getMovieByGenre = async (genreName) => {
  return Movies.find({
    genres: {
      $regex: genreName,
      $options: "i", //disable case sensitive
    },
  });
};

const saveMovie = async (movie) => {
  const newMovie = new Movies(movie);
  return newMovie.save();
};

const updateMovie = async (movieId, userid, movie) => {
  const filter = { _id: movieId, user: userid };
  return Movies.findOneAndUpdate(filter, movie, { new: true });
};

const deleteMovie = async (movieId, userid) => {
  const filter = { _id: movieId, user: userid };
  return Movies.findOneAndDelete(filter);
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
  getMovieByGenre,
};
