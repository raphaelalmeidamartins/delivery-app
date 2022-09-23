const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
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
      modelName: "Product",
      tableName: "products",
    }
  );

  // Product.associate = (models) => {
  //   Product.belongsToMany(models.Sale, {
  //     through: models.SalesProducts,
  //     foreignKey: "productId",
  //     as: "sales",
  //   });
  // };

  return Product;
};

module.exports = Product;
