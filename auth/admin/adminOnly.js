function adminOnly(req, res, next) {
  const user = req.user;

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Доступ запрещен. Требуется роль администратора." });
  }

  next(); // Если роль admin, пропускаем запрос дальше
}

module.exports = adminOnly;
