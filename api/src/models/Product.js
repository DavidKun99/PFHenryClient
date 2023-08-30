const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      sku: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      number_part: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_fabricator: {
        type: DataTypes.STRING,
      },
      id_category: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      disponibility: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 5,
        validate: {
          min: 0,
          max: 10000,
        },
      },
        category_name: {
          type: DataTypes.STRING,
      },
        fabricator_name: {
        type: DataTypes.STRING,
      },
         father_category: {
        type: DataTypes.STRING,
      },
      optimized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
