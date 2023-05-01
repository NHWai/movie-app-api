const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Movie use Director as Embedding Model */
const MovieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //setting user as foregin key
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\S/.test(v); // check if v contains at least one non-whitespace character
      },
      message: (props) =>
        `${props.path} cannot contain only whitespace characters`,
    },
  },
  director: {
    type: {
      _id: false,
      name: {
        type: String,
        required: true,
      },
    },
  },
  genres: {
    type: [String],
    enum: [
      "Action",
      "Anime",
      "Adventure",
      "Comedy",
      "Crime",
      "Drama",
      "Documentary",
      "Fantasy",
      "Horror",
      "Legal",
      "Mystery",
      "Musical",
      "Romance",
      "Sci-Fi",
      "Sports",
      "Thriller",
      "Western",
      "SitCom",
    ],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  totalRating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  totalReviews: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  photoId: {
    type: String,
  },
});

module.exports = mongoose.model("Movies", MovieSchema);

/*
(Notes: In embedding model(Movie Model), ID of embedded model (Director) have to be given if you are creating a new movie with same old director. If not there will be a confilct in Director ID which means same director with different ID  )

const movieCategories = [
  "Action",
  "Anime",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Legal Drama",
  "Mystery",
  "Romance",
  "Sci/Fi",
  "Thriller",
  "Western",
  "SitCom"
];

*/
