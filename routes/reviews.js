const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchemaV } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn,isAuthor } = require("../middlewares");
const reviewController = require('../controllers/review');


// Middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchemaV.validate(req.body);
    if (error) throw new ExpressError(400, error.details[0].message);
    next();
};

// Add Review
router.post("/:id/reviews", isLoggedIn ,validateReview, wrapAsync(reviewController.add));

// Delete Review
router.post("/:id/review/:reviewId/delete", isLoggedIn ,isAuthor,wrapAsync(reviewController.delete));

module.exports = router;
