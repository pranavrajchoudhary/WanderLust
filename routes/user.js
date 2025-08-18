const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares")
const userController = require('../controllers/user');



router.get("/auth", (req, res) => {
    res.render("user/signup.ejs");

})

//signup
router.post("/signup", wrapAsync(userController.signup));

//login
router.post("/login", saveRedirectUrl ,  passport.authenticate('local', 
    { failureRedirect: '/auth', failureFlash: true }),
     userController.login)

//logout
router.get("/logout", userController.logout)



module.exports = router;