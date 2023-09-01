const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      sku: {
        type: DataTypes.INTEGER,
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
      id_brand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model:'Brand',
          key:'id_brand',
        }
      },
      id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model:'Category',
          key:'id_category',
        }
      },
      detail: {
        type: DataTypes.JSONB,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      image: {
        type: DataTypes.STRING,
      },
      disponibility: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
        validate: {
          min: 0,
          max: 10000,
        },
      },
      
      createdInDb: {
        type: DataTypes.BOOLEAN,
    
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
