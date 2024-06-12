const express = require("express");

const router = express.Router();

const { validateToken } = require("../middlewares/auth")
const { index, showId } = require("../controllers/matapelajaran.controller")

// /api/babs
router.get("/", validateToken, index);
router.get("/:id", validateToken, showId);


module.exports = router;