const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Movie use Director as Embedding Model */
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: {
      name: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
      },
      gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
      },
    },
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movies", MovieSchema);

/*
(Notes: In embedding model(Movie Model), ID of embedded model (Director) have to be given if you are creating a new movie with same old director. If not there will be a confilct in Director ID which means same director with different ID  )
*/
