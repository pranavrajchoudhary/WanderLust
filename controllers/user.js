
const User = require('../models/user');
const passport = require("passport"); 

module.exports.signup = 

async (req, res,next) => {
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
}

module.exports.login = async (req, res) => {
        
       req.flash("success", "Welcome Back! Logged In succesfully")
       let redirecturl = res.locals.redirectUrl || "/listings";
        res.redirect(redirecturl);
    
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success", "Logged Out !");
        res.redirect("/listings");
    })
}