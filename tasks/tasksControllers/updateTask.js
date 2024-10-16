const taskManager = require("../tasksManager");


async function updateTask(req, res) {
    const { id } = req.params;
    const { title, description } = req.body; // Пример полей для обновления
    try {
        const updated = await taskManager.updateTask(id, { title, description });
        if (!updated) {
            return res.status(404).json({ message: 'Задача не найдена' });
        }
        res.status(200).json({ message: 'Задача успешно обновлена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении задачи', error: error.message });
    }
}

module.exports = updateTask