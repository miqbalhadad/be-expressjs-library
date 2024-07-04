const { expect } = require("chai");
const sinon = require("sinon");
const { Book } = require("../../../src/models/book");
const bookService = require("../../../src/services/bookService");

describe("Book Service", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should fetch all available books", async () => {
    const mockBooks = [
      { title: "Book 1", author: "Author 1", isBorrowed: false },
      { title: "Book 2", author: "Author 2", isBorrowed: false },
    ];

    sinon.stub(Book, "findAll").resolves(mockBooks);

    const books = await bookService.getAvailableBooks();

    expect(books).to.deep.equal(mockBooks);
    expect(Book.findAll.calledOnce).to.be.true;
  });

  it("should add a new book", async () => {
    const newBookData = { title: "New Book", author: "New Author" };
    const mockBook = { id: 1, ...newBookData };

    sinon.stub(Book, "create").resolves(mockBook);

    const book = await bookService.addBook(newBookData.title, newBookData.author);

    expect(book).to.deep.equal(mockBook);
    expect(Book.create.calledOnceWith(newBookData)).to.be.true;
  });

  // Add more tests for other functions (getBookById, updateBook, deleteBook)
});
