const { Router } = require("express");
const { getAllOrders, getOrderById } = require("../handlers/orderHandler");

const orderRouter = Router();

orderRouter.get('/id/:id',  getOrderById);
orderRouter.get('/',  getAllOrders);
module.exports = orderRouter; 
