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

  return Product;
};

module.exports = Product;
