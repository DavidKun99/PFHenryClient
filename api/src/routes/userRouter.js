const { Router } = require("express");
const {getAllUsers} = require("../handlers/userHandler");

const routerUsers = Router();

routerUsers.get('/',  getAllUsers);

module.exports = routerUsers;
