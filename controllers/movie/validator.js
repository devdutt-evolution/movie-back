const { body } = require("express-validator");

exports.movieBody = [
  body("title").notEmpty().withMessage("Title is required"),
  body("year")
    .notEmpty()
    .isInt({ min: 1800, max: new Date().getUTCFullYear() })
    .withMessage(`Year can range in 1800 to ${new Date().getUTCFullYear()}`),
  body("path").notEmpty().withMessage("Please upload the movie poster"),
];
