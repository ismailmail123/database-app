const express = require("express");

const router = express.Router();

const { index, update } = require("../controllers/progress.controller");
const { validateToken } = require("../middlewares/auth");

// /api/books
router.get("/", validateToken, index);
router.put("/:id", validateToken, update);


module.exports = router;