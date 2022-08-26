var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function (req, res) {
  res.redirect("/home");
});

router.get("/register", function (req, res) {
  res.render("index/register");
});

router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  var newPassword = new User({ password: req.body.password });
  console.log(newPassword.password.length,newPassword.password);
  if(newPassword.password.length<5){
    console.log(newPassword.length);
    req.flash("error","Password Should More Than 5 Character");
    res.redirect("/register");
  }
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Hi " + user.username + ", Welcome to My Store!");
        res.redirect("/home");
      });
    }
  });
});

router.get("/login", function (req, res) {
  res.render("index/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged you out!!");
  res.redirect("/home");
});

module.exports = router;
