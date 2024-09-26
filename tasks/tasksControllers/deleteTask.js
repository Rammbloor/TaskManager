const taskManager = require("../tasksManager");

async function deleteTasks(req, res) {
    const {id} = req.params;//получаем ид из параметров запроса

    if (!id) {
        return res.status(400).json({message: 'Необходимо указать id удаляемой задачи'});
    }
    try {
        taskManager.deleteTask(id)
        res.status(200).json({message: `Задача по id ${id} успешно удалена`});
    } catch (err) {
        res.status(500).json({message: 'Ошибка при удалении задачи', err})
    }
}

module.exports = deleteTasks