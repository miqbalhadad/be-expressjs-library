const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
const bodyParser = require("body-parser");
const { initDB } = require("./src/config/db");

const app = express();
const port = 3000;

// Init Database
initDB();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger API Documentation
app.use("/v1/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const bookRoutes = require("./src/routes/bookRoutes");
const memberRoutes = require("./src/routes/memberRoutes");
const borrowRoutes = require("./src/routes/borrowRoutes");
const returnRoutes = require("./src/routes/returnRoutes");

app.use("/books", bookRoutes);
app.use("/members", memberRoutes);
app.use("/borrow", borrowRoutes);
app.use("/return", returnRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
