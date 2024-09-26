const express = require('express');
const router = express.Router();
const loginUser = require('../auth/authControllers/loginUser');
const changePassword = require('../auth/usersControllers/userChangePassword');
const {newUserRegister} = require('../auth/usersControllers/newUserRegister');
const getUserList = require('../auth/usersControllers/getUserList')
const authenticateToken = require("../auth/authenticateToken");
const deleteUser= require('../auth/usersControllers/deleteUser');


router.post("/register",newUserRegister);
router.post("/changePassword",authenticateToken,changePassword);
router.get("/",authenticateToken, getUserList)
router.delete("/:id",authenticateToken, deleteUser)

module.exports = router;