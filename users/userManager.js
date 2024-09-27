const bcrypt = require('bcryptjs');
const sql = require('../dataBase'); // Путь к вашему файлу базы данных

class UserManager {
    // Метод для добавления нового пользователя
    async addUser(userOptions) {
        const { login, name, password } = userOptions;

        const existingUser = await this.getUser(login);
        if (existingUser) {
            throw new Error('Пользователь с таким логином уже существует');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [user] = await sql`
            INSERT INTO users (login, name, password) VALUES (${login}, ${name}, ${hashedPassword}) RETURNING *;
        `;

        return user; // Вернем добавленного пользователя
    }

    // Метод для получения пользователя по логину
    async getUser(login) {
        const [user] = await sql`
            SELECT * FROM users WHERE login = ${login};
        `;
        return user; // Вернем пользователя или undefined
    }
    async getAllUsers() {
        const { rows } = await sql`SELECT * FROM users`; // Запрос к базе данных для получения всех пользователей
        return rows; // Возвращаем массив пользователей
    }

    // Метод для удаления пользователя
    async deleteUser(id) {
        const { count } = await sql`
            DELETE FROM users WHERE id = ${id} RETURNING count(*);
        `;
        return count > 0; // Вернем true, если пользователь был удален
    }

    // Метод для проверки логина и пароля пользователя
    async validateUser(login, password) {
        const user = await this.getUser(login);
        if (!user) return false;

        return await bcrypt.compare(password, user.password);
    }

    // Метод для изменения пароля
    async changePassword(login, currentPassword, newPassword) {
        const user = await this.getUser(login);
        if (!user) throw new Error('Пользователь не найден');

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) throw new Error('Текущий пароль введен неправильно');

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await sql`
            UPDATE users SET password = ${hashedNewPassword} WHERE login = ${login};
        `;
    }
}

module.exports = new UserManager();