const commentManager = require("../commentsManager");

async function createComment(req, res) {
    const { id: taskId } = req.params;
    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ message: 'Пожалуйста, укажите автора и текст комментария.' });
    }

    try {
        const comment = await commentManager.addComment({ content: text }, req.user.id, taskId);
        res.status(201).json({ message: 'Комментарий добавлен.', comment });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при добавлении комментария', err });
    }
}

module.exports = createComment;
