const newMapper = require("../mapper");
const { userManager } = require("./newUserRegister");

async function getAllUsers(req, res) {
  const requesterRole = req.user.role; // Роль текущего пользователя

  try {
    if (requesterRole !== "admin") {
      return res
        .status(403)
        .json({ message: "У вас нет прав для получения списка пользователей" });
    }

    const users = await userManager.getAllUsers(); // Получаем всех пользователей
    const mappedUsers = users.map((user) => new newMapper(user));
    return res.json(mappedUsers); // Возвращаем список пользователей
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при получении списка пользователей",
        error: error.message,
      });
  }
}
module.exports = getAllUsers;
