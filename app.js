const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
require("dotenv").config();

const listingsRouter = require("./routes/listings");
const reviewsRouter = require("./routes/reviews");
const userRouter = require("./routes/user");
const session = require("express-session");

const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const { send } = require("process");


const mongoURL = process.env.MONGO_URI;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));


main().then(() => console.log("connectedToDb")).catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoURL);
}

const sessionOpt = {
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    }
}

app.use(session(sessionOpt));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

 



// Routes
app.use("/", listingsRouter);
app.use("/listings", reviewsRouter);
app.use("/",userRouter);

// Catch-all 404
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found !!!"));
});

// Error handler
app.use((err, req, res, next) => {
    if (err.name === "ValidationError") err.message = "Invalid Entries";
    let { status = 500, message = "Unknown Error Occurred" } = err;
    res.render("extras/error.ejs", { err });
});

app.listen(8080, () => {
    console.log("Server is running at: http://localhost:8080/listings");
});
