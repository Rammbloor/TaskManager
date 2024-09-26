const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

//База данных в виде объекта(реализуем класс)
class Users {
    constructor(options) {
        this.name = options.name;
        this.id = options.id;
        this.login = options.login;
        this.password = options.password;

    }

    // Метод для хеширования пароля при создании пользователя
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

// Метод для проверки пароля
    async comparePassword(inputPassword) {
        return await bcrypt.compare(inputPassword, this.password)
    }
}


class UserManager {
    constructor() {
        this.users = {}// База данных пользователей в виде объекта
        this.filePath = path.join(__dirname, 'users.json')//Файл для сохранения юзеров
        this.loadUsers()//загружаем юзеров при запуске
    }

// Метод для сохраения пользователей в файл
    saveUsers() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), 'utf-8')
    }

    // Метод для загрузки пользователей из файла
    loadUsers() {
        if (fs.existsSync(this.filePath)) {
            const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            this.users = {};

            for (const [login, userData] of Object.entries(data)) {
                this.users[login] = new Users(userData); // Создаем экземпляр Users для каждого пользователя
            }
        }
    }

    // Метод для добавления нового пользователя
    async addUser(userOptions) {
        if (this.userExists(userOptions.login)) {
            throw new Error('Пользователь с таким логином уже существует');
        }

        // Создаем экземпляр пользователя
        const user = new Users(userOptions);
        await user.hashPassword(); // Хешируем пароль
        this.users[user.login] = user; // Сохраняем пользователя в "базе данных"
        this.saveUsers()//Сохраняем юзера в файл
    }

    // Проверка существования пользователя по логину
    userExists(login) {
        return !!this.users[login];
    }

// Получение пользователя по логину
    getUser(login) {
        return this.users[login]
    }

    deleteUser(id) {

        delete this.users[id]
        this.saveUsers()
        return !this.users.hasOwnProperty(id);
    }


    // Проверка логина и пароля пользователя
    async validateUser(login, password) {
        const user = this.getUser(login)
        if (!user) {
            return false;
        }
        return await user.comparePassword(password)
    }

// Метод для изменения пароля пользователя
    async changePassword(login, currentPassword, newPassword) {
        const user = this.getUser(login)
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        const isPasswordCorrect = await user.comparePassword(currentPassword)
        if (!isPasswordCorrect) {
            throw new Error('Текущий пароль введен неправильно')
        }
        // Хешируем новый пароль и сохраняем его
        user.password = await bcrypt.hash(newPassword, 10); // Хешируем новый пароль
    }
}

module.exports = {Users, UserManager};

