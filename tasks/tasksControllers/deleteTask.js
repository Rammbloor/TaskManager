const taskManager = require("../tasksManager");

async function deleteTasks(req, res) {
    const { id:id } = req.params; // получаем id из параметров запроса

    if (!id) {
        return res.status(400).json({ message: 'Необходимо указать id удаляемой задачи' });
    }

    try {
        const isDeleted = await taskManager.deleteTask(id);
        if (!isDeleted) {
            return res.status(404).json({ message: `Задача с id ${id} не найдена` });
        }
        res.status(200).json({ message: `Задача с id ${id} успешно удалена` });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при удалении задачи', error: err.message });
    }
}




module.exports = deleteTasks;