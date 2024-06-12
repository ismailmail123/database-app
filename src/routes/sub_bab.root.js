const express = require("express");

const router = express.Router();

const { index } = require("../controllers/sub_bab.controller");
const { validateToken } = require("../middlewares/auth");

// /api/subbabs
router.get("/", validateToken, index);


module.exports = router;