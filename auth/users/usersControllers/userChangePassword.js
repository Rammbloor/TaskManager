const {  userManager } = require("./newUserRegister");

async function changePassword(req, res) {
  const { login, currentPassword, newPassword } = req.body;
  // Проверяем, что все необходимые данные переданы
  if (!login || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "Укажите все необходимые данные" });
  }

  try {
    await userManager.changePassword(login, currentPassword, newPassword);
    res.status(200).json({ message: "Пароль успешно изменен" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = changePassword;
