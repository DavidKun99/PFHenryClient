require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { NUMBER } = require("sequelize");
const { Detailorder, Product, User } = require("../db");
const {
  onlyNumbersCheck,
  onlyLettersCheck,
  onlyLettersOrNumbersCheck,
} = require("../helpers/validation.js");
const {
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
} = require("../helpers/detailordershelps");

// -----------xxxx-------------------------
// Traigo producto x id de mi base de datos

const getById = async (req, res, next) => {
  const { id } = req.params;
  let check = onlyNumbersCheck(id);
  if (check !== true) return res.status(412).json({ message: "Invalid Input" });
  try {
    const detail = await Detailorder.findByPk(id);
    detail
      ? res.status(200).json(detail)
      : res
          .status(404)
          .json({ message: "The searched detail order is not found" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// -----------xxxx-------------------------
// Traigo todos los details orders o sus propiedades

const getDetailOrderByProperties = async (req, res, next) => {
  const {
    idDetail,
    price,
    quantity,
    date,
    status,
    idProduct,
    idOrder,
    idUser,
  } = req.query;
  console.log("este es el query :", req.query);

  try {
    if (idProduct & idUser) {
      let check = onlyNumbersCheck(idProduct, idUser);
      if (check !== true) {
        console.log("este productId o userId: ", check);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByProductAndUser(idProduct, idUser);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message:
              "there is no detail order with the product and user required",
          });
    }
    if (idProduct & status) {
      if (status !== "active" || status !== "inactive") {
        console.log("este es status: ", status);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByProductAndStatus(idProduct, status);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message:
              "there is no detail order with the product and status required",
          });
    }
    if (idProduct & date) {
      if (!(date instanceof Date)) {
        console.log("este es date: ", date);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByProductAndDate(idProduct, date);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message:
              "there is no detail order with the product and date required",
          });
    }
    if (idProduct & price) {
      let check = onlyNumbersCheck(idProduct, price);
      if (check !== true) {
        console.log("este productId o userId: ", check);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByProductAndPrice(idProduct, price);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message:
              "there is no detail order with the product and the price required",
          });
    }
    if (idProduct & quantity) {
      let check = onlyNumbersCheck(idProduct, quantity);
      if (check !== true) {
        console.log("este productId o userId: ", check);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByProductAndQuantity(idProduct, quantity);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message:
              "there is no detail order with the product and the quantity required",
          });
    }
    if (idUser & date) {
      if (!(date instanceof Date)) {
        console.log("este es date: ", date);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByUserAndDate(idUser, date);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message: "there is no detail order with the user & date required",
          });
    }
    if (idUser & status) {
      if (status !== "active" || status !== "inactive") {
        console.log("este es status: ", status);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByUserAndStatus(idUser, status);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message:
              "there is no detail order with the user and status required",
          });
    }
    if (date & status) {
      if (
        !(date instanceof Date) ||
        status !== "active" ||
        status !== "inactive"
      ) {
        console.log("este es date: ", date);
        console.log("este es status: ", status);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByDateAndStatus(idUser, status);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message: "there is no detail order with the date & status required",
          });
    }
    if (status) {
      if (status !== "active" || status !== "inactive") {
        console.log("este es  status: ", status);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let detail = await getDetailByStatus(status);
      return detail.length > 0
        ? res.status(200).json(detail)
        : res.status(404).json({
            message: "there is no detail order with the status required",
          });
    }
    if (idOrder) {
      let check = onlyNumbersCheck(idOrder);
      if (check !== true) {
        console.log("este idOrder: ", check);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let details = await getDetailByOrder(idOrder);
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({
            message: "there is no detail order with order id required",
          });
    }
    if (
      !idDetail &&
      !price &&
      !quantity &&
      !date &&
      !status &&
      !idProduct &&
      !idOrder &&
      !idUser
    ) {
      let details = await getDetailOrder();
      return details.length > 0
        ? res.status(200).json(details)
        : res.status(404).json({ message: "Details orders not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getById,
  getDetailOrderByProperties,
};
