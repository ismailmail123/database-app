const express = require("express");

const router = express.Router();

const { index, showId } = require("../controllers/bab.controller")

// /api/babs
router.get("/", index);
router.get("/:id", showId);


module.exports = router;