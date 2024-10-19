const express = require("express");
const router = express.Router();
const authenticateToken = require("../auth/authenticateToken");
const createTask = require("../tasks/tasksControllers/createTask");
const getAllTasks = require("../tasks/tasksControllers/getAllTasks");
const getTaskById = require("../tasks/tasksControllers/getTaskById");
const deleteTask = require("../tasks/tasksControllers/deleteTask");
const updateTask = require("../tasks/tasksControllers/updateTask");

// Создание новой задачи
router.post("/", authenticateToken, createTask);

// Получение всех задач (доступ для всех пользователей, возможно, с фильтрацией по пользователю)
router.get("/", authenticateToken, getAllTasks);

// Получение задачи по ID
router.get("/:id", authenticateToken, getTaskById);

// Обновление задачи (доступ для владельца задачи и администратора)
router.put("/:id", authenticateToken, updateTask);

// Удаление задачи (доступ для владельца задачи и администратора)
router.delete("/:id", authenticateToken, deleteTask);

module.exports = router;
