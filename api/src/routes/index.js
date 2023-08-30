const { Router } = require("express");
const productsRouter = require("./productRouter");

const mainRouter = Router(); 

mainRouter.use("/productos", productsRouter);

module.exports = mainRouter;
