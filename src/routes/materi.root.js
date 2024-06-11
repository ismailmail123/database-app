const express = require("express");

const router = express.Router();

const { index } = require("../controllers/materi.controller")

// /api/books
router.get("/", index);


module.exports = router;