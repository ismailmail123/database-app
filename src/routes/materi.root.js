const express = require("express");

const router = express.Router();

const { validateToken } = require("../middlewares/auth")
const { index } = require("../controllers/materi.controller")

// /api/books
router.get("/", validateToken, index);


module.exports = router;