const sql = require('../dataBase'); // Путь к вашему файлу базы данных

class CommentManager {
    // Метод для добавления нового комментария
    async addComment(commentOptions, userId, taskId) {
        const { content } = commentOptions;

        const [comment] = await sql`
            INSERT INTO comments (content, author, task_id) VALUES (${content}, ${userId}, ${taskId}) RETURNING *;
        `;

        return comment; // Вернем добавленный комментарий
    }

    // Метод для получения всех комментариев к задаче
    async getCommentsByTaskId(taskId) {
        return await sql`
            SELECT * FROM comments WHERE task_id = ${taskId};
        `; // Вернем массив комментариев
    }

    // Метод для удаления комментария
    async deleteComment(id) {
        const { count } = await sql`
            DELETE FROM comments WHERE id = ${id} RETURNING count(*);
        `;
        return count > 0; // Вернем true, если комментарий был удален
    }
}

module.exports = new CommentManager();