const express = require("express");

const router = express.Router();

const { index, update } = require("../controllers/progress.controller");

// /api/books
router.get("/", index);
router.put("/:id", update);


module.exports = router;