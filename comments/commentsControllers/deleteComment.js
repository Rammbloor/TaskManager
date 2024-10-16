const commentManager = require("../commentsManager");

async function deleteComment(req, res) {
    const { id: id } = req.params;

    try {
        const isDeleted = await commentManager.deleteComment(id); // Добавлено await
        if (!isDeleted) {
            return res.status(404).json({ message: 'Комментарий не найден.' });
        }
        res.status(200).json({ message: 'Комментарий удален.' });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при удалении комментария', err });
    }
}


module.exports = deleteComment;
