const { Sequelize } = require("sequelize");
const ProductModel = require("./models/Product");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/PFHenry`,
  { logging: false }
);

ProductModel(sequelize);

const { Product } = sequelize.models;


module.exports = { sequelize, ...sequelize.models };
