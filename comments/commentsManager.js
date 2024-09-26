const fs = require('fs');
const path = require('path');

class Comment {
    constructor({ id, taskId, author, text, date }) {
        this.id = id;
        this.taskId = taskId;
        this.author = author;
        this.text = text;
        this.date = date || new Date().toISOString(); //добавим дату комментария
    }
}

class CommentManager {
    constructor() {
        this.comments = {}; // Объект для хранения комментариев
        this.nextId = 1; // Счетчик для уникальных ID комментариев
        this.filePath = path.join(__dirname, 'comments.json'); // Путь к файлу для сохранения комментариев
        this.loadComments(); // Загружаем комментарии из файла при запуске
    }


    saveComments() {
        fs.writeFileSync(this.filePath, JSON.stringify({ nextId: this.nextId, comments: this.comments }, null, 2), 'utf-8');
    }
    loadComments() {
        if (fs.existsSync(this.filePath)) {
            const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            this.comments = data.comments;
            this.nextId = data.nextId;
        }
    }
    addComment(commentOptions) {
        while (this.comments.hasOwnProperty(this.nextId)) {
            this.nextId++;
        }
        const comment = new Comment({ id: this.nextId++, ...commentOptions });
        this.comments[comment.id] = comment;
        this.saveComments();
        return comment;
    }

    getCommentsByTaskId(taskId) {
        return Object.values(this.comments).filter(comment => comment.taskId === taskId);
    }
    deleteComment(id) {
        if (id < this.nextId) {
            this.nextId = id;
        }
        delete this.comments[id];
        this.saveComments();
        return !this.comments.hasOwnProperty(id);
    }
}

module.exports = new CommentManager();