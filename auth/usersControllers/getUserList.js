const newMapper = require("../mapper");
const {userManager} = require("./newUserRegister");



const getUserList= (req, res) => {
   return res.json((Object.values(userManager.users)).map((user)=> new newMapper(user)));
};

module.exports = getUserList