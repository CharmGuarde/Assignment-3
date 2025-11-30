const express = require("express"); // import express framework
const router = express.Router(); // create a new router instance
const pages = require("../controllers/pagesController"); // import pages controller

// Home page
router.get("/", pages.home);

// About page
router.get("/about", pages.about);

// Contact page (get)
router.get("/contact", pages.contact);

// Handle contact form submission (post) 
router.post("/contact", pages.handleContact);

// Login page
router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router; // export the router to be used in other parts of the application
