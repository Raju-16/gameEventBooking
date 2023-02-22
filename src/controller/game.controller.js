const express = require("express");
const GameModel = require("../Model/game.model");

const gameRouter = express.Router();

gameRouter.get("/", async (req, res) => {
  let data;

  try {
    data = await GameModel.find().lean().exec();
  } catch (error) {
    return res.send("Error", error);
  }

  if (!data) {
    res.send("No game found");
  }

  res.send(data);
});

module.exports = gameRouter;
