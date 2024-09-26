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
        this.nextId = 1
        this.filePath = path.join(__dirname, 'users.json')//Файл для сохранения юзеров
        this.loadUsers()//загружаем юзеров при запуске
    }

// Метод для сохраения пользователей в файл
    saveUsers() {
        fs.writeFileSync(this.filePath, JSON.stringify({nextId: this.nextId, users: this.users}, null, 2), 'utf-8');
    }

    // Метод для загрузки пользователей из файла
    loadUsers() {
        if (fs.existsSync(this.filePath)) {
            const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            this.users = {};
            this.nextId = data.nextId || 1;
            if (data && data.users) {
                for (const [login, userData] of Object.entries(data.users)) {
                    this.users[login] = new Users(userData); // Создаем экземпляр Users для каждого пользователя
                    this.nextId = Math.max(this.nextId, userData.id + 1); // Обновляем nextId, если id текущего пользователя больше
                }
            }
        }
    }

    // Метод для добавления нового пользователя
    async addUser(userOptions) {
        if (this.userExists(userOptions.login)) {
            throw new Error('Пользователь с таким логином уже существует');
        }

        while (this.users.hasOwnProperty(this.nextId)) {
            this.nextId++;
        }
        // Создаем экземпляр пользователя
        const user = new Users({ ...userOptions, id: this.nextId });
        await user.hashPassword(); // Хешируем пароль
        this.users[user.login] = user; // Сохраняем пользователя в "базе данных"
        this.nextId++
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
        const user = Object.values(this.users).find(u => u.id === id);
        if (user) {
            delete this.users[user.login];
            this.saveUsers();
            return true;
        }
        return false;
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

