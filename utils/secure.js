const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const ITERATIONS = 30;
const LENGTH = 64;

const hashIt = (password) => {
  return crypto
    .pbkdf2Sync(password, process.env.SALT, ITERATIONS, LENGTH, "sha512")
    .toString("hex");
};

const pass = (payload) => {
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: "6h",
  });
};

const checkToken = (token) => {
  try {
    let result = jwt.decode(token, process.env.SECRET);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { hashIt, checkToken, pass };
