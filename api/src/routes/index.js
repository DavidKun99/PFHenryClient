const { Router } = require("express");
const mainRouter = Router(); 

//IMPORTAMOS TODAS LAS RUTAS
const productsRouter = require("./productRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const cartRouter = require("./cartRouter");
const ratingRouter = require("./ratingRouter");


//DEFINICION DE USO DE LAS RUTAS
mainRouter.use("/productos", productsRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/rating", ratingRouter);


module.exports = mainRouter;
