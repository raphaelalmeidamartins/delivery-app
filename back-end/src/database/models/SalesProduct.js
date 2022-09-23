"use strict";

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    "SalesProducts",
    {
      saleId: { type: DataTypes.INTEGER, foreignKey: true },
      productId: { type: DataTypes.INTEGER, foreignKey: true },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "salesProducts",
      underscored: true,
    }
  );

    SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.Sale, { foreignKey: "saleId", as: "sales" });
    SalesProducts.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "products",
    });
  };

  return SalesProducts;
};
