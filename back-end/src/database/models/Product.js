const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      urlImage: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'products',
    }
  );

  return Product;
};
module.exports = Product;
