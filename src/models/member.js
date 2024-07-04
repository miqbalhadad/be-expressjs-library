const { DataTypes } = require("sequelize");
const { sequalize } = require("../config/db");

const Member = sequalize.define(
  "members",
  {
    name: DataTypes.STRING,
    allowNull: false,
  },
  {
    timestamps: true,
  }
);

module.exports = { Member };
