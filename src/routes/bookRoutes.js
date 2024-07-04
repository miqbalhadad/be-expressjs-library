const express = require("express");
const { getAvailableBooksHandler, addBookHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler } = require("../controllers/booksController");

const router = express.Router();

// Define the routes
router.get("/", getAvailableBooksHandler); // Get all available books
router.post("/", addBookHandler); // Add a new book
router.get("/:id", getBookByIdHandler); // Get a book by ID
router.put("/:id", updateBookHandler); // Update a book by ID
router.delete("/:id", deleteBookHandler); // Delete a book by ID

module.exports = router;
