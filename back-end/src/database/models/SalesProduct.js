const SalesProduct = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'SalesProducts',
    {
      saleId: { type: DataTypes.INTEGER, foreignKey: true },
      productId: { type: DataTypes.INTEGER, foreignKey: true },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      modelName: 'SalesProducts',
      tableName: 'salesProducts',
    }
  );

  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Sale, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  }

  return SalesProducts;
};

module.exports = SalesProduct;
