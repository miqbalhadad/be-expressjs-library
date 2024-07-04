const express = require("express");
const { getMembers, borrowBook, returnBook } = require("../controllers/memberController");

const router = express.Router();

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Retrieve a list of members
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get("/", getMembers);

/**
 * @swagger
 * /members/{memberId}/borrow/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Member or book not found
 */
router.post("/:memberId/borrow/:bookId", borrowBook);

/**
 * @swagger
 * /members/{memberId}/return/{bookId}:
 *   post:
 *     summary: Return a book
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Member or book not found
 */
router.post("/:memberId/return/:bookId", returnBook);

module.exports = router;
