const fs = require('fs');
const path = require('path');


class Task {
    constructor({id, title, description, status, owner}) {
        this.id = id;
        this.title = title
        this.description = description
        this.status = status || 'pending'// Статус задачи по умолчанию
        this.owner = owner;
    }
}


class TasksManager {
    constructor() {
        this.tasks = {}; // Сохраняем задачи в виде объекта
        this.nextId = 1; // Счетчик для задания уникальных ID задач
        this.filePath = path.join(__dirname, 'tasks.json')// файл для хранения задач
        this.loadTasks()//загружаем задачи из файла при запуске
    }

//Метод для сохранения задач в файл
    saveTask() {
        fs.writeFileSync(this.filePath, JSON.stringify({nextId: this.nextId, tasks: this.tasks}, null, 2), 'utf-8')
    }

//Метод для загрузки задач из файла
    loadTasks() {
        if (fs.existsSync(this.filePath)) {
            const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            this.tasks = data.tasks;
            this.nextId = data.nextId;
        }
    }

    addTask(taskOptions) {
        while (this.tasks.hasOwnProperty(this.nextId)) {
            this.nextId++;
        }
        const task = new Task({ id: this.nextId++, ...taskOptions, owner: userId });
        this.tasks[task.id] = task;
        this.saveTask();
        return task;
    }

    getAllTasks(userId) {
        return Object.values(this.tasks).filter(task => task.owner === userId);
    }

    getTasksById(id) {

        const task = this.tasks[id];
        if (!task) {
            return null;
        }
        return task;
    }

    deleteTask(id) {
        if (id < this.nextId) {
            this.nextId = id;
        }
        delete this.tasks[id]
        this.saveTask()
        return !this.tasks.hasOwnProperty(id);
    }
}

module.exports = new TasksManager()