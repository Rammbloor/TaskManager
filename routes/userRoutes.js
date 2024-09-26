const express = require('express');
const router = express.Router();
const changePassword = require('../users/usersControllers/userChangePassword');
const {newUserRegister} = require('../users/usersControllers/newUserRegister');
const getUserList = require('../users/usersControllers/getUserList')
const authenticateToken = require("../auth/authenticateToken");
const deleteUser= require('../users/usersControllers/deleteUser');


router.post("/register",newUserRegister);
router.post("/changePassword",authenticateToken,changePassword);
router.get("/",authenticateToken, getUserList)
router.delete("/:id",authenticateToken, deleteUser)

module.exports = router;