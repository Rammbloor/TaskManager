const bcrypt = require("bcryptjs");
const sql = require("../../dataBase"); // Путь к вашему файлу базы данных

class UserManager {
  // Метод для добавления нового пользователя
  async addUser(userOptions) {
    const { login, name, password, role = "user" } = userOptions;

    const existingUser = await this.getUser(login);
    if (existingUser) {
      throw new Error("Пользователь с таким логином уже существует");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await sql`
            INSERT INTO users (login, name, password, role) 
            VALUES (${login}, ${name}, ${hashedPassword}, ${role} ) 
            RETURNING *;
        `;

    return user; // Вернем добавленного пользователя
  }

  // Метод для обновления информации о пользователе
  async updateUser(id, userUpdates) {
    // Здесь можно проверить, есть ли пользователь с таким ID
    const existingUser = await this.getUser(id);
    if (!existingUser) {
      throw new Error("Пользователь не найден");
    }

    // Формируем SQL-запрос для обновления пользователя
    const { login, name, password } = userUpdates;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const [updatedUser] = await sql`
        UPDATE users 
        SET login = COALESCE(${login}, login), 
            name = COALESCE(${name}, name), 
            password = COALESCE(${hashedPassword}, password)
        WHERE id = ${id} 
        RETURNING *;
    `;

    return updatedUser; // Возвращаем обновленного пользователя
  }

  // Метод для получения пользователя по логину
  async getUser(login) {
    const [user] = await sql`
            SELECT * FROM users WHERE login = ${login};
        `;
    return user; // Вернем пользователя или undefined
  }

  async getUserById(id) {
    const [user] = await sql`
        SELECT * FROM users WHERE id = ${id};
    `;
    return user; // Вернём пользователя или undefined, если его нет
  }

  // Метод для получения всех пользователей
  async getAllUsers() {
    const users = await sql`
        SELECT * FROM users;
    `;
    return users; // Возвращаем список пользователей
  }

  // Метод для изменения роли пользователя
  async changeUserRole(id, newRole) {
    const { count } = await sql`
        UPDATE users SET role = ${newRole} WHERE id = ${id} RETURNING count(*);
    `;
    return count > 0; // Вернем true, если роль была изменена
  }

  // Метод для удаления пользователя
  async deleteUser(id) {
    {
      // Удаляем пользователя и возвращаем удаленного пользователя
      const [deletedUser] = await sql`
        DELETE FROM users WHERE id = ${id} RETURNING *;
    `;
      return deletedUser !== undefined; // Вернем true, если пользователь был удален
    }
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
    if (!user) throw new Error("Пользователь не найден");

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordCorrect)
      throw new Error("Текущий пароль введен неправильно");

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await sql`
            UPDATE users SET password = ${hashedNewPassword} WHERE login = ${login};
        `;
  }
}

module.exports = new UserManager();
