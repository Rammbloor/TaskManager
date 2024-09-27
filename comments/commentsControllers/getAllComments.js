const commentManager = require("../commentsManager");

async function getAllComments(req, res) {
    const { taskId } = req.params;

    try {
        const comments = await commentManager.getCommentsByTaskId(taskId); // Добавлено await
        res.status(200).json({ message: 'Комментарии получены.', comments });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении комментариев', err });
    }
}

module.exports = getAllComments;
