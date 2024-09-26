const {User,UserManager} = require("../userManager");
const newMapper = require("../mapper");

const userManager = new UserManager(); // Создаем экземпляр класса UserManager

async function newUserRegister(req, res) {
    const { name, id, login, password } = req.body;

    // Проверяем, что все необходимые данные переданы
    if (!name || !id || !login || !password) {
        return res.status(400).json({ message: 'Укажите все необходимые данные' });
    }

    try {
        await userManager.addUser({ name, id, login, password });
        const userInfo = userManager.getUser(login);
        const response = new newMapper(userInfo);
        res.send(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { newUserRegister, userManager }
