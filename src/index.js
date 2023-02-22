const express = require("express");
const connect = require("./Configs/db");
const gameRouter = require("./controller/game.controller");
const checkoutRouter = require("./controller/checkout.controller");
const { register, login } = require("./controller/user.controller");

const app = express();
app.use(express.json());

app.use("/game", gameRouter);
app.use("/checkout", checkoutRouter);
app.use("/signup", register);
app.use("/login", login);

app.listen(8080, () => {
  try {
    connect();
    console.log("Connect to database");
  } catch (error) {
    console.log("Something went wrong:", error);
  }
});
