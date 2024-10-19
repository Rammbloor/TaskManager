async function getAuthUser(req, res) {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Пользователь не аутентифицирован" });
  }
  return res.json({ message: "Информация о пользователе", user: req.user });
}

module.exports = getAuthUser;
