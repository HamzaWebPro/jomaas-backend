require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const routes = require("./routes");

dbConnection();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(routes);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
