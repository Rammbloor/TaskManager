const sql = require('../dataBase'); // Путь к вашему файлу базы данных

class TaskManager {
    // Метод для добавления новой задачи
    async addTask(taskOptions, userId) {
        const { title, description, status = 'pending' } = taskOptions;

        const [task] = await sql`
            INSERT INTO tasks (title, description, status, author) VALUES (${title}, ${description}, ${status}, ${userId}) RETURNING *;
        `;

        return task; // Вернем добавленную задачу
    }

    // Метод для получения всех задач для пользователя
    async getAllTasks(userId) {
        return await sql`
            SELECT * FROM tasks WHERE author = ${userId};
        `; // Вернем массив задач
    }

    // Метод для получения задачи по ID
    async getTaskById(id) {
        const [task] = await sql`
            SELECT * FROM tasks WHERE id = ${id};
        `;
        return task; // Вернем задачу или undefined
    }

    // Метод для удаления задачи
    async deleteTask(id) {
        const { count } = await sql`
            DELETE FROM tasks WHERE id = ${id} RETURNING count(*);
        `;
        return count > 0; // Вернем true, если задача была удалена
    }
}

module.exports = new TaskManager();