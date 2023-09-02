const userController = require('../controllers/userController');

module.exports = {
  getAllUsers: (req, res) => {
        userController.getAllUsers(req, res);
  }
};
