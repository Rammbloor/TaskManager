const express = require('express');
const router = express.Router();
const authenticateToken = require("../auth/authenticateToken");
const addComment = require('../comments/commentsControllers/addComment');
const getAllComments = require('../comments/commentsControllers/getAllComments');
const deleteComment = require('../comments/commentsControllers/deleteComment');


router.post('/:tasks/:id/comments', authenticateToken, addComment);


router.get('/:tasks/:id/comments', authenticateToken, getAllComments);

// Удаление комментария по ID
router.delete('/:tasks/:id/comments/:id', authenticateToken, deleteComment,);

module.exports = router;