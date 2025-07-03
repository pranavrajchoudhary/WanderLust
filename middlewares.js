// routes/middlewares/index.js
const Listing = require("./models/listing");
const review = require("./models/review");

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/auth");
    }
    next();
}

const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }else{
      res.locals.redirectUrl = "/";

    }
    next();
};


const isOwner  = async(req,res,next)=>{
    let {id} = req.params;
        let listing = await Listing.findById(id);
    
        if(!listing.owner._id.equals(res.locals.currUser._id)){
            req.flash("error","You are not an owner of this listing!");
         return res.redirect(`/listings/${id}`);
        }
        next();
}


const isAuthor  = async(req,res,next)=>{
    let { id, reviewId } = req.params;

     
        let rvw = await review.findById(reviewId);
    
        if(!rvw.author._id.equals(res.locals.currUser._id)){
            req.flash("error","You are not an author of this review!");
         return res.redirect(`/listings/${id}`);
        }
        next();
}



module.exports = {
    isLoggedIn,
    saveRedirectUrl,
    isOwner,
    isAuthor
};
