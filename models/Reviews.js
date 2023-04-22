const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    requied: true,
  },
});

module.exports = mongoose.model("Reviews", ReviewSchema);
