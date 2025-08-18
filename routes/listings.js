const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn } = require("../middlewares");
const { isOwner } = require("../middlewares");

const multer = require('multer');
const {storage} = require('../cloudConfig')
const upload = multer({storage})
// Middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) throw new ExpressError(400, error.details[0].message);
    next();
};

const listingController = require('../controllers/listing');


// Home
router.get("/", (req, res) => {

    res.render("listings/home.ejs");
});
// Index and create
router.route('/listings')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing,upload.single('image'), wrapAsync(listingController.create));
    
// New form render
router.get("/listings/new", isLoggedIn, listingController.new);

// Show and Update

router.route('/listings/:id')
    .get(wrapAsync(listingController.show))
    .put(isLoggedIn, isOwner, validateListing, upload.single('image'),wrapAsync(listingController.update));

// Edit
router.get("/listings/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

router.delete("/listings/:id/delete", isLoggedIn, isOwner, wrapAsync(listingController.delete));

module.exports = router;
