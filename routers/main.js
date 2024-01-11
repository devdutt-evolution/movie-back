const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const authControllers = require("../controllers/auth/index");
const movieControllers = require("../controllers/movie/index");
const { signInBody } = require("../controllers/auth/validator");
const { movieBody } = require("../controllers/movie/validator");
const { validate } = require("../utils/validator");

// auth
router.post("/signin", signInBody, validate, authControllers.singIn);

// movies
router.use("/movies", authControllers.checkAuth);
router.post("/movies", movieBody, validate, movieControllers.createMovie);
router.get("/movies", movieControllers.getMovies);
// specified movie
router.param("movieId", movieControllers.checkMovieId);
router.get("/movies/:movieId", movieControllers.getMovie);
router.put(
  "/movies/:movieId",
  movieBody,
  validate,
  movieControllers.updateMovie
);

// multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "posters");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  },
});

const upload = multer({ storage });
router.post("/fileupload", upload.single("poster"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File is required" });
  res.status(200).json({ path: req.file.filename });
});

module.exports = router;
