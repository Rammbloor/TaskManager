const commentManager = require("../commentsManager");

async function getCommentsByTaskId(req, res) {
  const { id } = req.params; // Получаем ID задачи из параметров
  try {
    const comments = await commentManager.getCommentsByTaskId(id);
    res.status(200).json(comments); // Возвращаем комментарии
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при получении комментариев",
        error: error.message,
      });
  }
}

module.exports = getCommentsByTaskId;
