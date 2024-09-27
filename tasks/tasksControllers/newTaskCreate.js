const taskManager = require("../tasksManager");

async function createTasks(req, res) {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
        return res.status(400).json({ message: 'Необходимо указать название и описание задачи' });
    }

    try {
        const task = await taskManager.addTask({ title, description }, userId); // Добавляем await
        res.status(201).json({ message: 'Задача успешно создана', task });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при создании задачи', err });
    }
}

module.exports = createTasks;