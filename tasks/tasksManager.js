const sql = require("../dataBase"); // Путь к вашему файлу базы данных

class TaskManager {
  // Метод для добавления новой задачи
  async addTask(taskOptions, userId) {
    const { title, description, status = "pending" } = taskOptions;

    const [task] = await sql`
            INSERT INTO tasks (title, description, status, author) VALUES (${title}, ${description}, ${status}, ${userId}) RETURNING *;
        `;

    return task; // Вернем добавленную задачу
  }

  // Метод для получения всех задач для пользователя
  async getAllTasks(userId) {
    return sql`
            SELECT * FROM tasks WHERE author = ${userId};
        `; // Вернем массив задач
  }
  async updateTask(id, taskData) {
    const { title, description } = taskData; // Извлекаем данные для обновления

    // Обновление задачи в базе данных
    const [updatedTask] = await sql`
            UPDATE tasks
            SET title = COALESCE(${title}, title), 
                description = COALESCE(${description}, description) 
            WHERE id = ${id} 
            RETURNING *;
        `;

    return updatedTask; // Вернем обновленную задачу
  }
  // Метод для получения задачи по ID
  async getTaskById(id) {
    const [task] = await sql`
            SELECT * FROM tasks WHERE id = ${id};
        `;
    return task; // Вернем задачу или undefined
  }

  async deleteTask(id) {
    const { count } = await sql`
        DELETE FROM tasks WHERE id = ${id} RETURNING id;
    `;
    return count > 0; // Вернем true, если задача была удалена
  }
}

module.exports = new TaskManager();
