const orderController = require('../controllers/orderController');

module.exports = {
  getAllOrders: (req, res) => {
    orderController.getAllOrders(req, res);
  }
};