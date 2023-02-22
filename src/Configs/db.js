const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://rpraju16:raju12345@cluster0.1zie0.mongodb.net/gameEventBooking"
  );
};

module.exports = connect;
