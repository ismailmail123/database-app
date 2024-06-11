const express = require("express");

const router = express.Router();

const { index } = require("../controllers/matapelajaran.controller")

// /api/babs
router.get("/", index);


module.exports = router;