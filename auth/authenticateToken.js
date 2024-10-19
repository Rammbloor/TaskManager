const jwt = require("jsonwebtoken");
// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; //// Извлекаем токен из заголовка

  if (!token) {
    return res.sendStatus(401); // Если токен отсутствует, возвращаем 401
  }

  jwt.verify(token, "RamPamPam", (err, user) => {
    if (err) {
      return res.sendStatus(403); // Если токен недействителен, возвращаем 403
    }
    req.user = user; // Сохраняем информацию о пользователе в запросе
    next(); // Передаем управление следующему middleware
  });
};
module.exports = authenticateToken;
