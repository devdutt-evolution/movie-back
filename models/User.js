const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    hash: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
