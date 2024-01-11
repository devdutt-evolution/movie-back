const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    // no error return
    return res.status(400).json({ message: result.array()[0].msg });

  next();
};
