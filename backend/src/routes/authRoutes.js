const express = require("express");

const { login } = require("../controllers/authController");
const { loginValidation } = require("../validators/authValidator");

const router = express.Router();

router.post("/login", loginValidation, login);

module.exports = router;