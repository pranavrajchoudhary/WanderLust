
const express = require("express");
const router = express.Router();
const { checkout, paymentSuccess, fetch } = require("../controllers/checkout");
const { isLoggedIn } = require("../middlewares");
const wrapAsync = require("../utils/wrapAsync");


router.post("/:id/checkout", isLoggedIn, wrapAsync(checkout));
router.get("/:id/checkout" , isLoggedIn, wrapAsync(fetch)) // working
router.get("/payment-success", isLoggedIn, wrapAsync(paymentSuccess));

module.exports = router;
