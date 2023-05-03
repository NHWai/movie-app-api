const MovieService = require("../service/MovieService");
const Reviews = require("../models/Reviews.js");
const cloudinary = require("../config/cloudinary");

//Error Handler Function
const handle = (fn, httpErrorCode) => (req, res, next) => {
  return fn(req, res, next).catch((err) => {
    res.status(httpErrorCode).json({ message: err.message });
  });
};

// Handler Function for each HTTP Verbs
const getAllMovieHandler = async (req, res, next) => {
  const movielist = await MovieService.getAllMovies();
  if (!movielist) throw Error("No movies");
  const resBody = {
    meta: {
      total: movielist.length,
    },
    data: [...movielist],
  };

  return res.status(200).json(resBody);
};

const getMovieByIdHandler = async (req, res, next) => {
  const movieId = req.params["movieId"];
  const movie = await MovieService.getMovieById(movieId);
  if (!movie) throw Error("No movies found for given id");
  const resBody = {
    meta: {
      id: movieId,
    },
    data: movie,
  };
  return res.status(200).json(resBody);
};

const findMovieByTitleHandler = async (req, res, next) => {
  const title = req.params["title"].split("_").join(" ");
  const movie = await MovieService.getMovieByTitle(title);
  if (!movie) throw Error("No movies found by given title");
  const resBody = {
    meta: {
      total: movie.length,
    },
    data: movie,
  };
  return res.status(200).json(resBody);
};

const findMovieByGenreHandler = async (req, res, next) => {
  const genre = req.params["genre"].split(",");
  const movie = await MovieService.getMovieByGenre(genre);
  if (!movie) throw Error("No movies found by given genres");
  const resBody = {
    meta: { total: movie.length },
    data: movie,
  };
  return res.status(200).json(resBody);
};

const newMovieHandler = async (req, res, next) => {
  const movie = {
    ...req.body,
    rating: Number(req.body.rating),
    totalRating: Number(req.body.rating),
    year: Number(req.body.year),
    genres: JSON.parse(req.body.genres),
    director: JSON.parse(req.body.director),
    user: req.user.id,
    totalReviews: 1,
  };

  // if cover image is uploaded, save it in cloudinary
  if (req.files && req.files.length > 0) {
    const result = await cloudinary.uploader.upload(req.files[0].path, {
      resource_type: "image",
      folder: "DEV",
      use_filename: true,
      allowed_formats: ["jpg", "jpeg", "png"],
    });
    movie.photoUrl = result.secure_url;
    movie.photoId = result.public_id;
  }

  const newMovie = await MovieService.saveMovie(movie);
  if (!newMovie) throw Error("Cannot create a new movie");
  const resBody = {
    meta: {
      id: newMovie._id,
    },
    data: newMovie,
  };
  res.location(`/movies/${newMovie._id}`);
  return res.status(201).json(resBody);
};

const findMovieByDirectorHandler = async (req, res, next) => {
  const director = req.params["director"];

  const movies = await MovieService.findMovieByDirector(director);

  if (!movies || movies.length === 0) throw Error("No movies Found");
  const resBody = {
    meta: {
      total: movies.length,
    },
    data: movies,
  };
  return res.status(200).json(resBody);
};

const updateMovieHandler = async (req, res, next) => {
  const movie = {
    ...req.body,
    rating: Number(req.body.rating),
    year: Number(req.body.year),
    genres: JSON.parse(req.body.genres),
    director: JSON.parse(req.body.director),
    user: req.user.id,
  };
  // // if new cover image is uploaded, save it in cloudinary
  if (req.files && req.files.length > 0) {
    const result = await cloudinary.uploader.upload(req.files[0].path, {
      resource_type: "image",
      folder: "DEV",
      use_filename: true,
      allowed_formats: ["jpg", "jpeg", "png"],
    });
    //deleting old photo in cloudinary
    movie.photoId &&
      (await cloudinary.uploader.destroy(movie.photoId, { invalidate: true }));

    //setting the url and id of newly uploaded photo
    movie.photoUrl = result.secure_url;
    movie.photoId = result.public_id;
  }

  const movieId = req.params["movieId"];
  //getting the total rating from REVIEWS Model
  const reviewsRating = (await Reviews.find({ movieId: movieId })).map(
    (el) => el.rating
  );

  //if there are reviews, calcutate total rating from all reviews
  if (reviewsRating.length > 0) {
    const grandTotalRating = reviewsRating.reduce(
      (accumulator, currval) => accumulator + currval,
      movie.rating
    );
    movie.totalRating = (grandTotalRating / (reviewsRating.length + 1)).toFixed(
      1
    );
  } else {
    movie.totalRating = movie.rating;
  }

  const movieUpdated = await MovieService.updateMovie(
    movieId,
    req.user.id,
    movie
  );
  if (!movieUpdated) throw Error("Cannot update the movie");
  const resBody = {
    meta: {
      id: movieId,
    },
    data: movieUpdated,
  };
  return res.status(200).json(resBody);
};

const deleteMovieHandler = async (req, res, next) => {
  const movieId = req.params["movieId"];
  const photoId = "DEV/" + req.params["photoId"];
  const userid = req.user.id;
  //deleting the photo in cloudinary
  await cloudinary.uploader.destroy(photoId, { invalidate: true });
  const movie = await MovieService.deleteMovie(movieId, userid);
  if (movie === null) throw Error("Cannot find the movie");
  return res.status(204).json(movie);
};

//Mapping the related function for each HTTP Verbs

const getAllMovie = (req, res, next) =>
  handle(getAllMovieHandler, 400)(req, res, next);

const getMovieById = (req, res, next) =>
  handle(getMovieByIdHandler, 400)(req, res, next);

const findMovieByTitle = (req, res, next) =>
  handle(findMovieByTitleHandler, 400)(req, res, next);

const findMovieByGenre = (req, res, next) =>
  handle(findMovieByGenreHandler, 400)(req, res, next);

const findMovieByDirector = (req, res, next) =>
  handle(findMovieByDirectorHandler, 400)(req, res, next);

const newMovie = (req, res, next) =>
  handle(newMovieHandler, 400)(req, res, next);

const updateMovie = (req, res, next) =>
  handle(updateMovieHandler, 400)(req, res, next);

const deleteMovie = (req, res, next) =>
  handle(deleteMovieHandler, 400)(req, res, next);

module.exports = {
  getAllMovie,
  getMovieById,
  findMovieByTitle,
  findMovieByGenre,
  newMovie,
  updateMovie,
  deleteMovie,
  findMovieByDirector,
};
