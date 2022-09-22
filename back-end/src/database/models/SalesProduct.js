const SalesProduct = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define(
    'SalesProduct',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      modelName: 'SalesProduct',
      tableName: 'salesProducts',
    }
  )

  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Sale, { foreignKey: 'id', as: 'saleId' });
    SalesProduct.belongsTo(models.Product, { foreignKey: 'id', as: 'productId' });
  };

  return SalesProduct;
};

module.exports = SalesProduct;