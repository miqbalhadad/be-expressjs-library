const validateBorrowRequest = (req) => {
  const { memberId, bookId } = req.body;
  if (!memberId || !bookId) {
    return "Member ID and Book ID are required";
  }
  return null;
};

module.exports = validateBorrowRequest;
