const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    "SalesProducts",
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      modelName: "SalesProducts",
      tableName: "salesProducts",
    }
  );

  // SalesProducts.associate = (models) => {
  //   SalesProducts.belongsTo(models.Sale, { foreignKey: "saleId", as: "sales" });
  //   SalesProducts.belongsTo(models.Product, {
  //     foreignKey: "productId",
  //     as: "products",
  //   });
  // };

  return SalesProducts;
};

module.exports = SalesProducts;
