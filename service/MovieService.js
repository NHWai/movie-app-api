let Movies = require("../models/Movies.js");

const getAllMovies = async () => {
  return Movies.find().populate({
    path: "user",
    select: "username",
  });
};

const getMovieById = async (movieId) => {
  return Movies.findById(movieId).populate({
    path: "user",
    select: "username",
  });
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

const getMovieByGenre = async (genreNames) => {
  return Movies.find({
    genres: {
      $in: genreNames.map((name) => new RegExp(name, "i")),
    },
  });
};

const saveMovie = async (movie) => {
  const newMovie = new Movies(movie);
  return newMovie.save();
};

const updateMovie = async (movieId, userid, movie) => {
  const filter = { _id: movieId, user: userid };
  return Movies.findOneAndUpdate(filter, movie, { new: true }).populate({
    path: "user",
    select: "username",
  });
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

const findMovieByUserId = async (userId) => {
  //quering movies by reference objectid
  return Movies.find({
    user: userId,
  }).populate({
    path: "user",
    select: "username",
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
  findMovieByUserId,
  getMovieByGenre,
};
