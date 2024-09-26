const taskManager = require("../tasksManager");

async function getAllTasks(req, res) {
    const userId = req.user.id;

    try {
        const tasks = taskManager.getAllTasks(userId);
        res.status(200).json({message: 'Задачи пользователя', tasks});
    } catch (err) {
        res.status(500).json({message: 'Ошибка при получении задач', err});
    }
}

module.exports = getAllTasks