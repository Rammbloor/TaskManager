const jwt = require("jsonwebtoken");
const { userManager } = require("../../users/usersControllers/newUserRegister");

async function loginUser(req, res) {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Укажите логин и пароль' });
    }

    try {
        const user = await userManager.getUser(login); // Получаем пользователя один раз

        if (!user) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        const isValidUser = await userManager.validateUser(login, password);
        if (!isValidUser) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        const token = jwt.sign({ name: user.name, login, id: user.id }, 'RamPamPam', { expiresIn: '3h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = loginUser;
