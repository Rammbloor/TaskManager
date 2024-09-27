const userManager= require("../userManager");
const newMapper = require("../mapper");

// Создаем экземпляр класса UserManager

async function newUserRegister(req, res) {
    const { name,  login, password } = req.body;

    // Проверяем, что все необходимые данные переданы
    if (!name  || !login || !password) {
        return res.status(400).json({ message: 'Укажите все необходимые данные' });
    }

    try {
        await userManager.addUser({ name,  login, password });
        const userInfo = userManager.getUser(login);
        const response = new newMapper(userInfo);
        res.send(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { newUserRegister, userManager }
