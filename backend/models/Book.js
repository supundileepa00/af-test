const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  isbn: {
    type: Number,
  },
  author: {
    type: String,
    ref: "Author",
  },
  price: {
    type: Number,
  },
  year: {
    type: Number,
  },
  publisher: {
    type: String,
  },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
