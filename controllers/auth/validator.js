const { ExpressValidator } = require("express-validator");
const { User } = require("../../models/User");

const { body } = new ExpressValidator({
  doesAccountExist: async (value) => {
    let userCount = await User.countDocuments({ email: value });

    if (userCount > 0) return value;

    throw new Error("Email is not registered");
  },
});

exports.signInBody = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("enter a valid email")
    .doesAccountExist(),
  body("password").notEmpty().withMessage("Password is required"),
];
