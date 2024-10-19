const userManager = require("../userManager");

async function updateUser(req, res) {
  const { id } = req.params;
  const userUpdates = req.body; // Получаем обновленные данные пользователя
  const requesterId = req.user.id; // ID текущего пользователя из токена
  const requesterRole = req.user.role; // Роль текущего пользователя

  try {
    // Проверяем, может ли пользователь обновить данные
    if (requesterId !== id && requesterRole !== "admin") {
      return res
        .status(403)
        .json({ message: "У вас нет прав для изменения этого пользователя" });
    }

    const updatedUser = await userManager.updateUser(id, userUpdates); // Используем метод updateUser
    res.status(200).json(updatedUser); // Возвращаем обновленные данные
  } catch (error) {
    if (error.message === "Пользователь не найден") {
      return res.status(404).json({ message: error.message });
    }
    res
      .status(500)
      .json({
        message: "Ошибка при обновлении пользователя",
        error: error.message,
      });
  }
}

module.exports = updateUser;
