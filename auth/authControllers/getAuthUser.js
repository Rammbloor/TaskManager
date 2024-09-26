async function getAuthUser(req, res) {
    return res.json({message: 'Информация о пользователе', user: req.user});
}

module.exports = getAuthUser