const router = require("express").Router();
const passport = require("passport");
var thoughtController = require("../controllers/thoughtController");
const Thought = require("../models/thought");


router.get("/login/success", (req, res) => {

    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
        })
    
    } else {
        res.status(403).json({error: true, message: "Not Authorized"});
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login Failure",
    })
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/google", 
    passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/logout", (req, res, next) => {
    req.logout(req.user, err => {
        if(err) return next(err);
    res.redirect(process.env.CLIENT_URL);
    });
})

router.get("/check_requser", (req, res) => { 
    res.json(req.user)
})

module.exports = router;