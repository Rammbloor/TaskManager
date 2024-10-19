const express = require('express');
const router = express.Router();
const changePassword = require('../auth/users/usersControllers/userChangePassword');
const { newUserRegister } = require('../auth/users/usersControllers/newUserRegister');
const authenticateToken = require("../auth/authenticateToken");
const deleteUser = require('../auth/users/usersControllers/deleteUser');
const updateUser = require('../auth/users/usersControllers/updateUser');
const getAuthUser = require("../auth/authControllers/getAuthUser");

// Регистрация нового пользователя
router.post("/register", newUserRegister);


//Получение информации об авторизованном пользователе
router.get("/check",authenticateToken, getAuthUser);

// Изменение пароля (доступ для всех пользователей)
router.post("/changePassword", authenticateToken, changePassword);

// Удаление пользователя (только для администраторов)
router.delete("/:id", authenticateToken, deleteUser);

// Обновление данных пользователя (доступ для обычных пользователей и администраторов)
router.put("/:id", authenticateToken, updateUser);

module.exports = router;
