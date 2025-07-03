const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const {isLoggedIn} = require("../middlewares");
const {isOwner} = require("../middlewares");
// Middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) throw new ExpressError(400, error.details[0].message);
    next();
};

// Home
router.get("/", (req, res) => {
    
    res.render("listings/home.ejs");
});

// Index
router.get("/listings", wrapAsync(async (req, res) => {
    
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New
router.get("/listings/new",isLoggedIn, (req, res) => {
     
    res.render("listings/new.ejs");
});

// Show
router.get("/listings/:id", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate({path : "reviews", populate : { path : "author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing not found !")
       return res.redirect("/listings")
    }else{
        res.render("listings/show.ejs", { thisListing: listing });

    }
}));

// Edit
router.get("/listings/:id/edit", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit.ejs", { listing });
}));

// Create
router.post("/listings",isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const { title, description, image, price, location, country } = req.body;
    const newListing = new Listing({
        title, description, image: { url: image, filename: title },
        price, location, country
    });
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing created !")
    res.redirect("/listings");
}));

// Update
router.put("/listings/:id",isLoggedIn,isOwner, validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { title, description, image, price, location, country } = req.body;
    // let listing = await Listing.findById(id);

    // if(!listing.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","You don't have permission to edit this listing !");
    //   return  res.redirect(`/listings/${id}`);
    // }

    await Listing.findByIdAndUpdate(id, {
        title, description, image: { url: image, filename: title },
        price, location, country
    });
    req.flash("success","Listing Updated succesfully!")
    res.redirect(`/listings/${id}`);
}));

// Delete
router.delete("/listings/:id/delete", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let rslt = await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", `Deleted ${rslt.title} Successfully!`)
    res.redirect("/listings");
}));

module.exports = router;
