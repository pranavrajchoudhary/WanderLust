const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { isLoggedIn } = require("../middlewares");  
 
router.get("/my-bookings", isLoggedIn, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("listing")  
      .sort({ createdAt: -1 });

    res.render("user/bookings", { orders });
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not load your bookings.");
    res.redirect("/");
  }
});

module.exports = router;
