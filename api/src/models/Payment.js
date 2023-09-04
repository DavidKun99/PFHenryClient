const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "payment",
    {
      order_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_status: {
        type: DataTypes.ENUM("approved", "failed"),
        allowNull: true,
      },
      date_approved: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      id_payment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authorization_code: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      mp_id_order: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      fee_mp: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
