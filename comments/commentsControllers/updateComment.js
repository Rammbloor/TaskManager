const commentManager = require("../commentsManager");

async function updateComment(req, res) {
  const { id } = req.params;
  const { content } = req.body; // Пример поля для обновления
  try {
    const updated = await commentManager.updateComment(id, { content });
    res.status(200).json({ message: "Комментарий успешно обновлен" });
    if (!updated) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при обновлении комментария",
        error: error.message,
      });
  }
}

module.exports = updateComment;
