const Book = require("../models/book");

const getBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books.map((book) => ({ ...book.toJSON(), available: book.quantity - book.borrowed })));
};

module.exports = { getBooks };
