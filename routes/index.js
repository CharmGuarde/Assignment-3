const express = require("express");
const router = express.Router();
const pages = require("../controllers/pagesController");

// Home page
router.get("/", pages.home);

// About page
router.get("/about", pages.about);

// Contact page
router.get("/contact", pages.contact);

module.exports = router;
