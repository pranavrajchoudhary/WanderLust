const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares")
router.get("/auth", (req, res) => {
    res.render("user/signup.ejs");

})

router.post("/signup", wrapAsync(async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({
            email: email,
            username: username
        });
        const rgsUser = await User.register(newuser, password);
        req.login(rgsUser,((err)=>{
            if(err){
               return next(err)
            }
            req.flash("success", "Registered Successfully !| Welcome ");
            res.redirect("/listings");
        }))
        
    } catch (error) {
        req.flash("error", error.message)
        res.redirect("/signup")
    }
}));

router.post("/login", saveRedirectUrl ,  passport.authenticate('local', 
    { failureRedirect: '/auth', failureFlash: true }),
     async (req, res) => {
        
       req.flash("success", "Welcome Back! Logged In succesfully")
       let redirecturl = res.locals.redirectUrl || "/listings";
        res.redirect(redirecturl);
    
})

router.get("/logout", (req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success", "Logged Out !");
        res.redirect("/listings");
    })
})



module.exports = router;