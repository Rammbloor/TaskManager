const commentManager = require("../commentsManager");


async function deleteComment(req, res) {
    const {id} = req.params;
    if (!commentManager.comments[id]) {
        return res.status(404).json({message: 'Комментарий не найден.'});
    }
    commentManager.deleteComment(id);
    res.status(200).json({message: 'Комментарий удален.'});
}

module.exports = deleteComment