const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes");


const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(mainRouter);

module.exports = app;
