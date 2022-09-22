const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      modelName: 'Sale',
      tableName: 'sales',
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'id', as: 'userId' });
    Sale.belongsTo(models.User, { foreignKey: 'id', as: 'sellerId' });
  };

  return Sale;
};

module.exports = Sale;