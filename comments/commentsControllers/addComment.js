const commentManager = require("../commentsManager");


async function addComment(req, res) {
    const {taskId} = req.params;
    const {author, text} = req.body;

    if (!author || !text) {
        return res.status(400).json({message: 'Пожалуйста, укажите автора и текст комментария.'});
    }

    const comment = commentManager.addComment({taskId, author, text});
    res.status(201).json({message: 'Комментарий добавлен.', comment});
}

module.exports = addComment