const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "rating",
    {
      rating_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
          max: 5,
        },
      },
      review: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};

