const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      totalprice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      order_status: {
        type: DataTypes.ENUM("success", "failed", "in process"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
