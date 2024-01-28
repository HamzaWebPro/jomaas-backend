const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;

const dbConnection = () => {
  mongoose
    .connect(dbUrl)
    .then(() => console.log("Database Connected!"))
    .catch((err) => console.log(err));
};

module.exports = dbConnection;
