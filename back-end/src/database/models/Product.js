const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(9, 2),
      urlImage: DataTypes.STRING,
    },
    {
      timestamps: false,
      modelName: 'Product',
      tableName: 'products',
    }
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.Sale, { through: models.SalesProducts, foreignKey: 'productId', as: 'sales' });

  };
};

module.exports = Product;