const { userManager } = require("./newUserRegister");

async function deleteUser(req, res) {
  const { id } = req.params;

  // Если пользователь — администратор, он может удалять любого пользователя
  if (req.user.role === "admin") {
    const result = await userManager.deleteUser(id);
    if (result) {
      return res.status(200).json({ message: "Пользователь успешно удалён" });
    } else {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
  }

  // Если обычный пользователь, проверяем, что он пытается удалить только себя
  if (req.user.id !== id) {
    return res
      .status(403)
      .json({ message: "Вы можете удалить только свой аккаунт" });
  }

  // Удаляем аккаунт пользователя
  const result = await userManager.deleteUser(id);
  if (result) {
    return res.status(200).json({ message: "Ваш аккаунт успешно удалён" });
  } else {
    return res.status(404).json({ message: "Пользователь не найден" });
  }
}

module.exports = deleteUser;
