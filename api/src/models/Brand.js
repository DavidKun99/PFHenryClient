const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Brand",
    {
      id_brand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
