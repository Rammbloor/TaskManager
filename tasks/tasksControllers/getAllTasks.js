const taskManager = require("../tasksManager");

async function getAllTasks(req, res) {
    const userId = req.user.id;

    try {
        const tasks = await taskManager.getAllTasks(userId); // Добавлено await
        res.status(200).json({ message: 'Задачи пользователя', tasks });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении задач', error: err.message });
    }
}


module.exports = getAllTasks;