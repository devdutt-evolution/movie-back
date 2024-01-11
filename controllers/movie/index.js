const { default: mongoose } = require("mongoose");
const { Movie } = require("../../models/Movie");

const createMovie = async (req, res) => {
  try {
    const { title, year, path } = req.body;

    await Movie.create({
      title,
      year,
      path,
      userId: req.userId,
    });

    res.status(201).json({ message: "Movie Created" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err && err.message ? err.message : err.toString() });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { title, year, path } = req.body;
    const { movieId } = req.params;

    await Movie.findOneAndUpdate(
      { _id: movieId, userId: req.userId },
      {
        title,
        year,
        path,
      }
    );

    res.status(200).json({ message: "Movie Updated" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err && err.message ? err.message : err.toString() });
  }
};

const getMovies = async (req, res) => {
  try {
    const {
      _q = "",
      _limit = "10",
      _page = "1",
      _sort = "year",
      _order = "desc",
    } = req.query;

    let option = {};
    option[_sort] = _order == "asc" ? 1 : -1;

    let aggregatePipe = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $sort: option,
      },
      {
        $skip: (parseInt(_page) - 1) * parseInt(_limit),
      },
      {
        $limit: parseInt(_limit),
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ];
    let movies;

    if (_q != "")
      aggregatePipe = [
        {
          $match: {
            $text: { $search: _q },
          },
        },
        ...aggregatePipe,
      ];

    let countMovies = await Movie.countDocuments({ userId: req.userId });

    movies = await Movie.aggregate(aggregatePipe);

    res.status(200).json({
      movies,
      // total: parseInt((countMovies - 1 + parseInt(_limit)) / parseInt(_limit)),
      hasMore: parseInt(_limit) * parseInt(_page) < countMovies,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err && err.message ? err.message : err.toString() });
  }
};

const getMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findOne(
      { _id: movieId },
      { createdAt: 0, updatedAt: 0 }
    ).lean();

    res.status(200).json({ movie });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err && err.message ? err.message : err.toString() });
  }
};

const checkMovieId = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    if (!movieId)
      return res.status(400).json({ message: "Movie not specified" });
    let tt = new mongoose.Types.ObjectId(movieId);

    let movie = await Movie.countDocuments({ _id: tt });

    if (!movie)
      return res.status(404).json({ message: "Specified movie not found" });

    next();
  } catch (err) {
    if (err.name == "BSONError")
      return res.status(404).json({ message: "No such movie found" });
    console.error(err);
    res
      .status(500)
      .json({ message: err && err.message ? err.message : err.toString() });
  }
};

module.exports = {
  createMovie,
  updateMovie,
  getMovie,
  getMovies,
  checkMovieId,
};
