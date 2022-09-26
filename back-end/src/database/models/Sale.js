'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, foreignKey: true, foreignKey: true },
      totalPrice: { type: DataTypes.DECIMAL(10, 2), },
      deliveryAddress: { type: DataTypes.STRING, },
      deliveryNumber: { type: DataTypes.STRING, },
      saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      modelName: 'Sale',
      tableName: 'sales',
    }
  );

  return Sale;
};
