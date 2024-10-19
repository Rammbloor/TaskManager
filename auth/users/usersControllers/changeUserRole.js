const userManager = require("../userManager");

async function changeUserRole(req, res) {
  const { id } = req.params; // Получаем ID пользователя
  const { role } = req.body; // Получаем новую роль
  const requesterRole = req.user.role; // Роль текущего пользователя

  try {
    if (requesterRole !== "admin") {
      return res
        .status(403)
        .json({ message: "У вас нет прав для изменения ролей пользователей" });
    }

    const updated = await userManager.changeUserRole(id, role); // Изменяем роль
    if (!updated) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({ message: "Роль пользователя успешно изменена" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при изменении роли пользователя",
        error: error.message,
      });
  }
}

module.exports = changeUserRole;
