const ratingController = require('../controllers/ratingController');

module.exports = {
  getRating: (req, res) => {
    ratingController.getRating(req, res);
  }
};