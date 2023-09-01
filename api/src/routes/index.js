const { Router } = require("express");
const productsRouter = require("./productRouter");

const mainRouter = Router(); 

mainRouter.use("/products", productsRouter);

module.exports = mainRouter;
