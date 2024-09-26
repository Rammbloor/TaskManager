const taskManager = require("../tasksManager");

async function getAllTasks(req, res) {

    try {
      const tasks=  taskManager.getAllTasks()
        res.status(200).json({message: `Все задачи показаны!`, tasks});
    } catch (err) {
        res.status(500).json({message: 'Ошибка при получении задач', err})
    }
}

module.exports = getAllTasks