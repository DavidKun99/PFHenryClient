const orderController = require('../controllers/orderController');

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderController.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

getOrderById: async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await orderController.getOrderById(id);
    res.status(200).json(order)
  } catch (error) {
    res.status(404).json(error.message);
  }
},

};