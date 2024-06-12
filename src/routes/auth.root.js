const express = require("express");

const router = express.Router();


const { login, register, removeUser } = require("../controllers/auth.controller");
const { validateLogin, validateRegister } = require("../middlewares/validator");

// /api/babs
router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);
router.delete("/delete/:id", removeUser)


module.exports = router;