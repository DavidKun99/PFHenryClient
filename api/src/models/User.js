const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("F", "M", "X"),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // para que valide que no haya correos repetidos
        validate: {
          isEmail: true, // para que valide que sea formato correo
        },
      },
      delivery_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CustomElementRegistry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("Administrador", "Cliente"),
        allowNull: false,
      },
      user_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      purchase_history: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
