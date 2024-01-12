const { body } = require("express-validator");

exports.movieBody = [
  body("title").notEmpty().withMessage("Title is required"),
  body("year")
    .notEmpty()
    .isInt({ min: 1800, max: new Date().getUTCFullYear() + 25 })
    .withMessage(
      `Year can range in 1888 to ${new Date().getUTCFullYear() + 25} `
    ),
  body("path").notEmpty().withMessage("Please upload the movie poster"),
];
