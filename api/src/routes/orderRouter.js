const { Router } = require("express");
const { getAllOrders } = require("../handlers/orderHandler");

const orderRouter = Router();

orderRouter.get('/',  getAllOrders);

module.exports = orderRouter; 
