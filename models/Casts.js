const mongoose = require("mongoose");
// const Movies = require("./Movies");
const Schema = mongoose.Schema;

/*Cast Use Movie model as Reference Model */
const CastSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId, //ForeignKey
    ref: "Movies",
  },
  protagonist: {
    type: String,
    required: true,
  },
  allie_rival: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Casts", CastSchema);
