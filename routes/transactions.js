const express = require("express");
const router = express.Router();
const t = require("../controllers/transactionsController");

router.get("/", t.list);
router.get("/create", t.addForm);
router.post("/create", t.add);
router.get("/edit/:id", t.editForm);
router.post("/edit/:id", t.update);
router.get("/delete/:id", t.deleteForm);
router.post("/delete/:id", t.delete);

module.exports = router;
