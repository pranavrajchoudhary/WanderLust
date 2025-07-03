const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchemaV } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn,isAuthor } = require("../middlewares");

// Middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchemaV.validate(req.body);
    if (error) throw new ExpressError(400, error.details[0].message);
    next();
};

// Add Review
router.post("/:id/reviews", isLoggedIn ,validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review({
        comment: req.body.comment,
        rating: req.body.rating,
    });
    newReview.author = req.user._id;
   
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success","Review added successfully");

    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review
router.post("/:id/review/:reviewId/delete", isLoggedIn ,isAuthor,wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully");

    res.redirect(`/listings/${id}`);
}));

module.exports = router;
