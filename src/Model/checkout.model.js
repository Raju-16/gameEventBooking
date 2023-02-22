const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    bookingDate: { type: String, required: true },
    location: { type: String, required: true },
    distance: { type: Number, required: true },
  },
  {
    versionkey: false,
    timestamps: true,
  }
);

const CheckoutModel = mongoose.model("checkout", checkoutSchema);

module.exports = CheckoutModel;
