const cartController = require('../controllers/cartController');

module.exports = {
  getCart: (req, res) => {
    cartController.getCart(req, res);
  }
};