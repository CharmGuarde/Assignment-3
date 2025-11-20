const express = require("express");
const router = express.Router();
const t = require("../controllers/transactionsController");

// show list + add form
router.get("/", t.list);

// create
router.post("/create", t.add);

// update
router.post("/edit/:id", t.update);

// delete
router.post("/delete/:id", t.delete);

module.exports = router;
