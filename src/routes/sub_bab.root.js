const express = require("express");

const router = express.Router();

const { index } = require("../controllers/sub_bab.controller")

// /api/subbabs
router.get("/", index);


module.exports = router;