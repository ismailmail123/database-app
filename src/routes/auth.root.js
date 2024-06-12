const express = require("express");

const router = express.Router();

const { login, register, removeUser } = require("../controllers/auth.controller")

// /api/babs
router.post("/login", login);
router.post("/register", register);
router.delete("/delete/:id", removeUser)


module.exports = router;