const { User } = require("../../models/User");
const { hashIt, pass, checkToken } = require("../../utils/secure");

const singIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).lean();

    if (hashIt(password) != user.hash)
      return res
        .status(401)
        .json({ message: "Email and Password does not match" });

    let payload = {
      _id: user._id,
      email,
    };

    return res.status(200).json({ token: pass(payload) });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err && err.message ? err.message : err.toString() });
  }
};

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      // if no header
      return res.status(401).json({ message: "Missing authentication" });

    let token = req.headers.authorization.split(" ")[1];
    if (!token || token == "null" || token == "undefined")
      return res.status(401).json({ message: "Not authorized" });

    let payload = checkToken(token);

    req.userId = payload._id;
    req.email = payload.email;
    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err && err.message ? err.message : err.toString() });
  }
};

module.exports = { singIn, checkAuth };
