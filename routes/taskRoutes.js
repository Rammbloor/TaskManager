const express = require('express');
const router = express.Router();
const createNewTask = require('../tasks/tasksControllers/newTaskCreate');
const getAllTasks = require('../tasks/tasksControllers/getAllTasks');
const getTasksById = require('../tasks/tasksControllers/getTaskById');
const deleteTasks = require('../tasks/tasksControllers/deleteTask');
const authenticateToken = require("../auth/authenticateToken");


router.post('/',authenticateToken, createNewTask);
router.get('/:id',authenticateToken, getTasksById);
router.get('/',authenticateToken, getAllTasks);
router.delete('/:id',authenticateToken, deleteTasks);

module.exports = router;