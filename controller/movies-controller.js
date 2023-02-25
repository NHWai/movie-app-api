const { find } = require("../models/Casts");
const MovieService = require("../service/MovieService");

//Error Handler Function
const handle = (fn, httpErrorCode) => (req, res, next) => {
  return fn(req, res, next).catch((err) => {
    res
      .status(httpErrorCode)
      .json({ message: Object.keys(err).length === 0 ? err.message : err });
  });
};

// Handler Function for each HTTP Verbs
const getAllMoviehandler = async (req, res, next) => {
  const movielist = await MovieService.getAllMovies();
  if (!movielist) throw Error("No movies");
  return res.status(200).json(movielist);
};

const getMovieByIdhandler = async (req, res, next) => {
  const movieId = req.params["movieId"];
  const movie = await MovieService.getMovieById(movieId);
  if (!movie) throw Error("No movies found for given id");
  return res.status(200).json(movie);
};

const findMovieByTitlehandler = async (req, res, next) => {
  const title = req.params["title"].split("_").join(" ");
  const movie = await MovieService.getMovieByTitle(title);
  if (!movie) throw Error("No movies found by given title");
  return res.status(200).json(movie);
};

const newMoviehandler = async (req, res, next) => {
  const movie = req.body;
  const newMovie = await MovieService.saveMovie(movie);
  if (!newMovie) throw Error("Cannot create a new movie");
  return res.status(200).json(newMovie);
};

const findMovieByDirectorhandler = async (req, res, next) => {
  const director = req.params["director"];
  const movies = await MovieService.findMovieByDirector(director);
  if (!movies) throw Error("No movies Found");
  return res.status(200).json(movies);
};

const updateMoviehandler = async (req, res, next) => {
  const movieId = req.params["movieId"];
  const movie = req.body;
  const movieUpdated = await MovieService.updateMovie(movieId, movie);
  if (!movieUpdated) throw Error("Cannot update the movie");
  return res.status(200).json(movieUpdated);
};

const deleteMoviehandler = async (req, res, next) => {
  const movieId = req.params["movieId"];
  const movie = await MovieService.deleteMovie(movieId);
  return res.status(204).json(movie);
};

//Mapping the related function for each HTTP Verbs

const getAllMovie = (req, res, next) =>
  handle(getAllMoviehandler, 400)(req, res, next);

const getMovieById = (req, res, next) =>
  handle(getMovieByIdhandler, 400)(req, res, next);

const findMovieByTitle = (req, res, next) =>
  handle(findMovieByTitlehandler, 400)(req, res, next);

const findMovieByDirector = (req, res, next) =>
  handle(findMovieByDirectorhandler, 400)(req, res, next);

const newMovie = (req, res, next) =>
  handle(newMoviehandler, 400)(req, res, next);

const updateMovie = (req, res, next) =>
  handle(updateMoviehandler, 400)(req, res, next);

const deleteMovie = (req, res, next) =>
  handle(deleteMoviehandler, 400)(req, res, next);

module.exports = {
  getAllMovie,
  getMovieById,
  findMovieByTitle,
  newMovie,
  updateMovie,
  deleteMovie,
  findMovieByDirector,
};
