const { Order, Detailorder, User } = require("../db");
const {
  onlyNumbersCheck,
  onlyLettersCheck,
  onlyLettersOrNumbersCheck,
} = require("../helpers/validation");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Detailorder }, { model: User }],
    });

    !orders
      ? res.status(400).json("There are no Orders")
      : res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  let check = onlyNumbersCheck(id);
  if (check !== true) return res.status(412).json({ message: "Invalid Input" });
  try {
    const order = await Order.findByPk(id);
    order
      ? res.status(200).json(order)
      : res.status(404).json({ message: "The searched order is not found" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { getAllOrders, getOrderById };