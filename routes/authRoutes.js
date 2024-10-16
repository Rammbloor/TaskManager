const express = require('express');
const router = express.Router();
const loginUser = require('../auth/authControllers/loginUser');
const getAuthUser = require('../auth/authControllers/getAuthUser');
const authenticateToken = require("../auth/authenticateToken");

router.post("/", loginUser);
router.get("/check",authenticateToken, getAuthUser);
module.exports = router;