const jwt = require("jsonwebtoken");
const {newUserRegister, userManager} = require("../usersControllers/newUserRegister");
require("../mapper");


async function loginUser(req, res) {
    const {login, password} = req.body;
    const name = await userManager.getUser(login).name
    const id = await userManager.getUser(login).id;///Не знал как получить ид сразу добавил получение тут
    if (!login || !password) {
        return res.status(400).json({message: 'Укажите логин и пароль'})
    }
    try {
        const isValidUser = await userManager.validateUser(login, password);
        if (!isValidUser) {
            return res.status(400).json({message: 'Неверный логин или пароль'})
        }

        const token = jwt.sign({name,login, id}, 'RamPamPam', {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (err) {
        res.status(400).json({message: err.message})
    }

}

module.exports = loginUser