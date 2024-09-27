const commentManager = require("../commentsManager");

async function addComment(req, res) {
    const { taskId } = req.params;
    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ message: 'Пожалуйста, укажите автора и текст комментария.' });
    }

    try {
        const comment = await commentManager.addComment({ taskId, author, text }); // Добавлено await
        res.status(201).json({ message: 'Комментарий добавлен.', comment });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при добавлении комментария', err });
    }
}

module.exports = addComment;
