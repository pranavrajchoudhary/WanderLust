const Listing = require('../models/listing');
const Review = require('../models/review');


module.exports.add = async (req, res) => {
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
}

module.exports.delete = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully");

    res.redirect(`/listings/${id}`);
}