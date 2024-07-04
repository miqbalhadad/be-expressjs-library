const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("library", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect database", error);
  }
};

module.exports = { sequelize, initDB };
