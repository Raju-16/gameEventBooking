const express = require("express");
const CheckoutModel = require("../Model/checkout.model");

const checkoutRouter = express.Router();

checkoutRouter.get("/", async (req, res) => {
  let data;

  try {
    data = await CheckoutModel.find().lean().exec();
  } catch (error) {
    return res.send("Error", error);
  }

  if (!data) {
    res.send("Did't get any data");
  }

  res.send(data);
});

checkoutRouter.post("/", async (req, res) => {
  //  CONDITION 1
  const startDate = new Date(req.body.startDate).getTime();
  const endDate = new Date(req.body.endDate).getTime();
  const bookingDate = new Date(req.body.bookingDate).getTime();
  //   console.log(startDate, endDate, bookingDate);

  const bookingDiffStart = startDate - bookingDate;
  const bookingDiffEnd = endDate - bookingDate;
  //   console.log(bookingDiffStart, bookingDiffEnd);
  // our booking date should not be more then event starting date or ending date so here we are checking the date of booking.

  if (bookingDiffStart < 0 || bookingDiffEnd < 0) {
    return res.send("Start and End date should be after booking date");
  }

  //  CONDITION 2
  const diffTime = (startDate - bookingDate) / (1000 * 60 * 60);

  // I apply this condition for checking the time gap between booking and starging that we have to maintain minimum at least 2hrs.
  if (diffTime < 2) {
    return res.send("You can book event before 2hrs");
  }

  //  CONDITION 3
  const startDate_2 = new Date(req.body.startDate);
  const endDate_2 = new Date(req.body.endDate);
  const bookingDate_2 = new Date(req.body.bookingDate);

  // I use this condition for the check the booking date that should not more then 1 day.
  const diffDays = startDate_2.getDate() - bookingDate_2.getDate();
  if (diffDays > 1) {
    return res.send("You can only book the event 1 day before");
  }

  //  CONDITION 4
  const duration = (endDate - startDate) / (1000 * 60 * 60);
  const hrDuration = duration % 24;
  const dayDuration = Math.floor(duration / 24);

  // CONDITION 5
  const distance = req.body.distance;
  let transportcharge = 0;
  if (distance <= 30) {
    transportcharge = 1500;
  } else {
    transportcharge = 50 * distance;
  }

  return res.send({ transportcharge, dayDuration, hrDuration, ...req.body });
});

module.exports = checkoutRouter;
