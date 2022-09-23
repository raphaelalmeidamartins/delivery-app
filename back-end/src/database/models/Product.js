'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(4, 2),
    },
    {
      timestamps: false,
      tableName: "products",
    }
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.Sale, {
      through: models.SalesProducts,
      foreignKey: "productId",
      as: "sales",
    });
  };

  return Product;
};
