const CastService = require("../service/CastService");

//Error Handler Function
const handle = (fn, httpErrorCode) => (req, res, next) => {
  return fn(req, res, next).catch((err) =>
    res
      .status(httpErrorCode)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err })
  );
};

// Handler Function for each HTTP Verbs
const getAllCastsHandler = async (req, res, next) => {
  const casts = await CastService.getAllCasts();
  if (!casts) throw Error("No Casts found");
  return res.status(200).json(casts);
};

const getCastsByMovieIdHandler = async (req, res, next) => {
  const movieId = req.params["movieId"];
  const movie = await CastService.getCastsByMovieId(movieId);
  if (!movie) throw Error("Cannot get casts with given movieId");
  return res.status(200).json(movie);
};

const getCastByIdHandler = async (req, res, next) => {
  const castId = req.params["castId"];
  const cast = await CastService.getCastById(castId);
  if (!cast) throw Error("No casts found for given Id");
  return res.status(200).json(cast);
};

const newCastHandler = async (req, res, next) => {
  const cast = req.body;
  const newCast = await CastService.saveCast(cast);
  if (!newCast) throw Error("Cannot create a new cast");
  return res.status(201).json(newCast);
};

const updateCastHandler = async (req, res, next) => {
  const castId = req.params["castId"];
  const cast = req.body;
  const updatedCast = await CastService.updateCast(castId, cast);
  if (!updatedCast) throw Error("Cannot update the cast");
  return res.status(200).json(updatedCast);
};

const deleteCastHandler = async (req, res, next) => {
  const castId = req.params["castId"];
  const deleted = await CastService.deleteCast(castId);
  if (!deleted) throw Error("Cannot delete the cast of given Id");
  res.status(204).end();
};

//Mapping the related function for each HTTP Verbs
const getAllCasts = (req, res, next) =>
  handle(getAllCastsHandler, 400)(req, res, next);

const getCastsByMovieId = (req, res, next) =>
  handle(getCastsByMovieIdHandler, 400)(req, res, next);

const getCastById = (req, res, next) =>
  handle(getCastByIdHandler, 400)(req, res, next);

const newCast = (req, res, next) => handle(newCastHandler, 400)(req, res, next);

const updateCast = (req, res, next) =>
  handle(updateCastHandler, 400)(req, res, next);

const deleteCast = (req, res, next) =>
  handle(deleteCastHandler, 400)(req, res, next);

// const deleteCast = async (req, res, next) => {
//   const castId = req.params["castId"];
//   console.log("castId =>", castId);
//   try {
//     const deleted = await CastService.deleteCast(castId);
//     if (!deleted) throw Error("Cannot delete the cast of given Id");
//     res.status(204).end();
//   } catch (err) {
//     res
//       .status(400)
//       .json({ Error: Object.keys(err).length === 0 ? err.message : err });
//   }
// };

module.exports = {
  getAllCasts,
  newCast,
  getCastsByMovieId,
  getCastById,
  updateCast,
  deleteCast,
};
