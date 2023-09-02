const { Router } = require("express");
const { getRating } = require("../handlers/ratingHandler");

const ratingRouter = Router();

ratingRouter.get('/',  getRating);

module.exports = ratingRouter; 

