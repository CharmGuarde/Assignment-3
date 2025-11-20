const express = require("express");
const router = express.Router();
const t = require("../controllers/transactionsController");

// Show main page
router.get("/", t.list);

// CRUD
router.post("/create", t.add);
router.post("/edit/:id", t.update);
router.post("/delete/:id", t.delete);

module.exports = router;
