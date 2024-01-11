const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    year: {
      type: Number,
    },
    path: {
      type: String, // image
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

MovieSchema.index({ title: "text" }); // for searching
MovieSchema.index({ title: 1, year: -1 }); // for recent first and unique title

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = { Movie };
