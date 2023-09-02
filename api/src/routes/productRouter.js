const { Router } = require("express");
const { getAllProducts } = require("../handlers/productsHandler");

const productsRouter = Router();

productsRouter.get('/',  getAllProducts);

module.exports = productsRouter; 
