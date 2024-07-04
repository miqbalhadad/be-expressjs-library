const { DataTypes } = require("sequelize");
const { sequalize } = require("../config/db");

const Book = sequalize.define(
  "books",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

module.exports = { Book };
