const productController = require('../controllers/productController');

module.exports = {
  getAllProducts: (req, res) => {
    productController.getAllProducts(req, res);
  }
};
