// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fromDate: Date,
  toDate: Date,
  guests: Number,
  guestNames: [String],
  guestAges: [Number],
  email: String,
  phone: String,
  requests: String,
  totalFare: Number,
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
