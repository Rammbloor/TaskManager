const commentManager = require("../commentsManager");


async function getAllComments(req, res) {
    const { taskId } = req.params;
    const comments = commentManager.getCommentsByTaskId(taskId);
    res.status(200).json({ message: 'Комментарии получены.', comments });
}

module.exports = getAllComments;