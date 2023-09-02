const { Detailorder, Product, User } = require("../db");
const { Op } = require("sequelize");

const getDetailOrder = async () => {
  return await Detailorder.findAll({
    include: [{ model: Product }, { model: User }],
  });
};

const getDetailByStatus = async (status) => {
  return await Detailorder.findAll({
    where: {
      detail_order_status: status,
    },
  });
};

const getDetailByProductAndUser = async (idProduct, idUser) => {
  return await Detailorder.findAll({
    where: {
      productId: idProduct,
      userId: idUser,
    },
  });
};

const getDetailByProductAndDate = async (idProduct, date) => {
  return await Detailorder.findAll({
    where: {
      productId: idProduct,
      order_detail_date: date,
    },
  });
};

const getDetailByProductAndStatus = async (idProduct, status) => {
  return await Product.findAll({
    where: {
      productId: idProduct,
      detail_order_status: status,
    },
  });
};

const getDetailByProductAndPrice = async (idProduct, price) => {
  return await Product.findAll({
    where: {
      productId: idProduct,
      price: price,
    },
  });
};

const getDetailByProductAndQuantity = async (idProduct, quantity) => {
  return await Product.findAll({
    where: {
      productId: idProduct,
      quantity: quantity,
    },
  });
};

const getDetailByUserAndDate = async (idUser, date) => {
  return await Detailorder.findAll({
    where: {
      userId: idUser,
      order_detail_date: date,
    },
  });
};

const getDetailByUserAndStatus = async (idUser, status) => {
  return await Detailorder.findAll({
    where: {
      userId: idUser,
      detail_order_status: status,
    },
  });
};

const getDetailByDateAndStatus = async (date, status) => {
  return await Detailorder.findAll({
    where: {
      order_detail_date: date,
      detail_order_status: status,
    },
  });
};

const getDetailByOrder = async (idOrder) => {
  return await Detailorder.findAll({
    where: {
      orderId: idOrder,
    },
  });
};

module.exports = {
  getDetailOrder,
  getDetailByStatus,
  getDetailByProductAndUser,
  getDetailByProductAndDate,
  getDetailByProductAndStatus,
  getDetailByProductAndPrice,
  getDetailByProductAndQuantity,
  getDetailByUserAndDate,
  getDetailByUserAndStatus,
  getDetailByDateAndStatus,
  getDetailByOrder,
};
