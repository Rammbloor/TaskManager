const express = require("express");
const router = express.Router();
const loginUser = require("../auth/authControllers/loginUser");

router.post("/", loginUser);

module.exports = router;
