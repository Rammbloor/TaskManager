const taskManager = require("../tasksManager");

async function getTasksBuId(req, res) {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({message: 'Необходимо указать id задачи'});
    }
    try {
        const task = taskManager.getTasksById(Number(id))
        if (task == null) {
            res.status(200).json({message: `Задача по id ${id} отсутствует`});
        } else {
            res.status(200).json({message: `Задача по id ${id} успешно показана`, task});
        }
    } catch (err) {
        res.status(500).json({message: 'Ошибка при получении задачи', err})
    }
}

module.exports = getTasksBuId