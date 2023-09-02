const { Router } = require("express");
const { getCart } = require("../handlers/cartHandler");

const cartRouter = Router();

cartRouter.get('/',  getCart);

module.exports = cartRouter; 
