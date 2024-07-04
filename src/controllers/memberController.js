const Member = require("../models/member");
const Book = require("../models/book");
const BorrowedBook = require("../models/borrowedBook");

const getMembers = async (req, res) => {
  const members = await Member.findAll({
    include: {
      model: BorrowedBook,
      include: Book,
    },
  });
  res.json(members);
};

const borrowBook = async (req, res) => {
  const { memberId, bookId } = req.params;

  const member = await Member.findByPk(memberId);
  const book = await Book.findByPk(bookId);

  if (!member || !book) {
    return res.status(404).send("Member or book not found");
  }

  if (member.penalty && new Date() < new Date(member.penaltyEndDate)) {
    return res.status(400).send("Member is penalized");
  }

  const borrowedBooks = await BorrowedBook.count({ where: { memberId } });
  if (borrowedBooks >= 2) {
    return res.status(400).send("Member cannot borrow more than 2 books");
  }

  if (book.borrowed >= book.quantity) {
    return res.status(400).send("Book is not available");
  }

  await BorrowedBook.create({ memberId, bookId, borrowedDate: new Date() });
  book.borrowed += 1;
  await book.save();

  res.send("Book borrowed successfully");
};

const returnBook = async (req, res) => {
  const { memberId, bookId } = req.params;

  const member = await Member.findByPk(memberId);
  const book = await Book.findByPk(bookId);

  if (!member || !book) {
    return res.status(404).send("Member or book not found");
  }

  const borrowedBook = await BorrowedBook.findOne({ where: { memberId, bookId } });
  if (!borrowedBook) {
    return res.status(400).send("Book was not borrowed by the member");
  }

  const borrowedDate = new Date(borrowedBook.borrowedDate);
  const currentDate = new Date();

  if ((currentDate - borrowedDate) / (1000 * 60 * 60 * 24) > 7) {
    member.penalty = true;
    member.penaltyEndDate = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000); // Penalty for 3 days
    await member.save();
  }

  await borrowedBook.destroy();
  book.borrowed -= 1;
  await book.save();

  res.send("Book returned successfully");
};

module.exports = { getMembers, borrowBook, returnBook };
