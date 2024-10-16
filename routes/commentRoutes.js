const express = require('express');
const router = express.Router();
const authenticateToken = require("../auth/authenticateToken");
const createComment= require('../comments/commentsControllers/createComment');
const getCommentsByTaskId =  require('../comments/commentsControllers/getCommentByTaskId');
const deleteComment = require("../comments/commentsControllers/deleteComment");
const updateComment =require("../comments/commentsControllers/updateComment");
// Добавление нового комментария к задаче
router.post('/:tasks/:id/comments', authenticateToken, createComment);

// Получение всех комментариев по ID задачи
router.get('/:tasks/:id/comments', authenticateToken, getCommentsByTaskId);

// Обновление комментария по ID (доступ для администраторов и владельцев комментария)
router.put('/comments/:commentId', authenticateToken, updateComment);

// Удаление комментария по ID (доступ для администраторов и владельцев комментария)
router.delete('/comments/:commentId', authenticateToken, deleteComment);

module.exports = router;
