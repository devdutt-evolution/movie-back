const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const router = require("./routers/main");
const path = require("path");
const swaggerDocs = require("./swagger.js");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

app.use(cors());
app.use(express.json());
app.use(
  "/",
  (req, res, next) => {
    console.log(req.method.toUpperCase(), " ", req.url);
    next();
  },
  router
);

const postersFolderPath = path.join(__dirname, "posters");
// Set up a route to serve static files from the posters folder
app.use("/posters", express.static(postersFolderPath));

mongoose
  .connect(process.env.DB_URL)
  .then((data) => {
    console.log("connected DB");
    app.listen(3001, (err, data) => {
      if (err) console.error(err);
      console.log("Server up on 3001");
    });
    swaggerDocs(app, 3001);
  })
  .catch((err) => console.log(err));
