const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    versionkey: false,
    timestamps: true,
  }
);

const GameModel = mongoose.model("game", gameSchema);

module.exports = GameModel;
