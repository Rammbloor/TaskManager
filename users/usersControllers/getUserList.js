const newMapper = require("../mapper");
const { userManager } = require("./newUserRegister");

const getUserList = async (req, res) => {
   try {
      const users = await userManager.getAllUsers(); // Предполагается, что этот метод возвращает всех пользователей из базы данных
      const mappedUsers = users.map(user => new newMapper(user));
      return res.json(mappedUsers);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при получении списка пользователей' });
   }
};

module.exports = getUserList;