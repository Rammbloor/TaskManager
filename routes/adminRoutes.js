const express = require('express');
const router = express.Router();
const authenticateToken = require("../auth/authenticateToken");
const adminOnly = require("../auth/admin/adminOnly");
const getAllUsers= require('../auth/users/usersControllers/getAllUsers');
const deleteUser = require("../auth/users/usersControllers/deleteUser");
const changeUserRole = require("../auth/users/usersControllers/changeUserRole");
const getUserById = require("../auth/users/usersControllers/getUserById");
const updateUser = require("../auth/users/usersControllers/updateUser");
const getAllTasks = require('../tasks/tasksControllers/getAllTasks');
const getTaskById = require("../tasks/tasksControllers/getTaskById");
const deleteTask = require("../tasks/tasksControllers/deleteTask");
const updateTask = require("../tasks/tasksControllers/updateTask")
const createTask = require("../tasks/tasksControllers/createTask");
const getCommentsByTaskId = require('../comments/commentsControllers/getCommentByTaskId')
const deleteComment = require("../comments/commentsControllers/deleteComment");
const updateComment = require("../comments/commentsControllers/updateComment");
const createComment = require("../comments/commentsControllers/createComment");

// Получение данных пользователя по ID (только для администраторов)
router.get("/:id", authenticateToken, adminOnly, getUserById);
// Обновление данных пользователя (только для администраторов)
router.put("/:id", authenticateToken, adminOnly, updateUser);
// Удаление пользователя (только для администраторов)
router.delete("/:id", authenticateToken, adminOnly, deleteUser);
// Получение всех пользователей (только для администраторов)
router.get("/", authenticateToken, adminOnly, getAllUsers);
//Изменение роли пользователя
router.patch("/:id/role", authenticateToken, adminOnly, changeUserRole);


// Получение всех задач (только для администраторов)
router.get("/", authenticateToken, adminOnly, getAllTasks);
// Получение задачи по ID (только для администраторов)
router.get("/:id", authenticateToken, adminOnly, getTaskById);
// Создание новой задачи (только для администраторов)
router.post("/", authenticateToken, adminOnly, createTask);
// Обновление задачи (только для администраторов)
router.put("/:id", authenticateToken, adminOnly, updateTask);
// Удаление задачи (только для администраторов)
router.delete("/:id", authenticateToken, adminOnly, deleteTask);


// Получение всех комментариев по ID задачи (только для администраторов)
router.get("/tasks/:id/comments", authenticateToken, adminOnly, getCommentsByTaskId);
// Создание нового комментария (только для администраторов)
router.post("/", authenticateToken, adminOnly, createComment);
// Обновление комментария (только для администраторов)
router.put("/comments/:id", authenticateToken, adminOnly, updateComment);
// Удаление комментария (только для администраторов)
router.delete("/:id", authenticateToken, adminOnly, deleteComment);



module.exports = router;
