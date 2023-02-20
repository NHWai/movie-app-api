const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todos", TodoSchema);

/*(Notes: this schema is needed only for driver(mongoose). Mongodb doesn't need schema) */
