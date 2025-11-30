const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// Redirect to GitHub for login
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub callback URL
router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful login
    res.redirect("/");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

module.exports = router;
