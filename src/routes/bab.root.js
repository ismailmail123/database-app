const express = require("express");

const router = express.Router();

const { index } = require("../controllers/bab.controller")

// /api/babs
router.get("/", index);


module.exports = router;