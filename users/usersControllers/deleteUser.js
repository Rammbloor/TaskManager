const {newUserRegister, userManager} = require("./newUserRegister");

async function deleteUser(req, res) {
    const {id} = req.params;//получаем ид из параметров запроса

    if (!id) {
        return res.status(400).json({message: 'Необходимо указать id удаляемого пользователя'});
    }
    try {
        await userManager.deleteUser(id);
        res.status(200).json({message: `Пользователь по id ${id} успешно удален`});
    } catch (err) {
        res.status(500).json({message: 'Ошибка при удалении пользователя', err})
    }
}

module.exports = deleteUser