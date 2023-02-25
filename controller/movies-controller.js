const MovieService = require("../service/MovieService");

async function getAllMovie(req, res, next) {
  try {
    const movielist = await MovieService.getAllMovies();
    if (!movielist) throw Error("Cannot find movielist");
    res.status(200).json(movielist);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
}

async function getMovieById(req, res, next) {
  const movieId = req.params["movieId"];
  try {
    const movie = await MovieService.getMovieById(movieId);
    if (!movie) throw Error("Cannot get movie with given ID");
    res.status(200).json(movie);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
}

async function findMovieByTitle(req, res, next) {
  const movieTitle = req.params["title"].split("_").join(" ");
  try {
    const movie = await MovieService.getMovieByTitle(movieTitle);
    if (movie.length === 0) {
      throw Error("Cannot get movie with given Title");
    }
    res.status(200).json(movie);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
}

async function newMovie(req, res, next) {
  try {
    const movie = await MovieService.saveMovie(req.body);
    if (!movie) throw Error("Cannot create a new movie");
    res.status(201).json(movie);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
}

async function updateMovie(req, res, next) {
  const movieId = req.params["movieId"];
  const movie = req.body;

  try {
    const movieUpdated = await MovieService.updateMovie(movieId, movie);
    if (!movieUpdated) throw Error("Cannot update the movie");
    res.status(200).json(movieUpdated);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
}

async function deleteMovie(req, res, next) {
  const movieId = req.params["movieId"];
  try {
    const movie = await MovieService.deleteMovie(movieId);
    res.status(204).json(movie);
  } catch (err) {
    res.status(400).json({
      Error: Object.keys(err).length === 0 ? "Cannot delete the movie" : err,
    });
  }
}

const findMovieByDirector = async (req, res, next) => {
  const director = req.params["director"];
  console.log("director =>", director);
  try {
    const movies = await MovieService.findMovieByDirector(director);
    if (!movies) throw Error("No movies Found");
    res.status(200).json(movies);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
};

module.exports = {
  getAllMovie,
  getMovieById,
  findMovieByTitle,
  newMovie,
  updateMovie,
  deleteMovie,
  findMovieByDirector,
};
