const express = require("express"); // import express framework
const router = express.Router(); // create a new router instance
const t = require("../controllers/transactionsController"); // import transactions controller

// show list + add form
router.get("/", t.list);

// create
router.post("/create", t.add);

// update
router.post("/edit/:id", t.update);

// delete
router.post("/delete/:id", t.delete);

module.exports = router; // export the router to be used in other parts of the application
