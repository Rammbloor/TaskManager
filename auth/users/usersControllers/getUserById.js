const userManager = require("../userManager");

async function getUserById(req, res) {
  const { id } = req.params; // Извлекаем ID из параметров

  try {
    const user = await userManager.getUserById(id); // Получаем пользователя по ID

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" }); // Если пользователь не найден
    }

    res.status(200).json(user); // Возвращаем данные пользователя
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при получении пользователя",
        error: error.message,
      }); // Обработка ошибок
  }
}

module.exports = getUserById;
