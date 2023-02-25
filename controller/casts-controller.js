const CastService = require("../service/CastService");

const getAllCasts = async (req, res, next) => {
  try {
    const castList = await CastService.getAllCasts();
    if (!castList) throw Error("Cannot get casts lists");
    res.status(200).json(castList);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
};

const newCast = async (req, res, next) => {
  const cast = req.body;
  try {
    const newCast = await CastService.saveCast(cast);
    if (!newCast) throw Error("Cannot create a new cast");
    res.status(201).json(newCast);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
};

const getCastsByMovieId = async (req, res, next) => {
  const movieId = req.params["movieId"];
  console.log("movieId =>", movieId);
  try {
    const movie = await CastService.getCastsByMovieId(movieId);
    console.log("movies =>", movie);
    if (!movie) throw Error("Cannot get casts with given movieId");
    res.status(200).json(movie);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
};

const getCastById = async (req, res, next) => {
  const castId = req.params["castId"];
  try {
    const cast = await CastService.getCastById(castId);
    if (!cast) throw Error("No casts found for given Id");
    res.status(200).json(cast);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
};

const updateCast = async (req, res, next) => {
  const castId = req.params["castId"];
  const cast = req.body;
  try {
    const updatedCast = await CastService.updateCast(castId, cast);
    if (!updatedCast) throw Error("Cannot update the cast");
    res.status(200).json(updatedCast);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
};

const deleteCast = async (req, res, next) => {
  const castId = req.params["castId"];
  console.log("castId =>", castId);
  try {
    const deleted = await CastService.deleteCast(castId);
    if (!deleted) throw Error("Cannot delete the cast of given Id");
    res.status(204).end();
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
};

module.exports = {
  getAllCasts,
  newCast,
  getCastsByMovieId,
  getCastById,
  updateCast,
  deleteCast,
};
