const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      modelName: "User",
      tableName: "users",
    }
  );

  // User.associate = (models) => {
  //   User.hasMany(models.Sale, { foreignKey: "userId", as: "sales" });
  //   User.hasMany(models.Sale, { foreignKey: "sellerId", as: "sales" });
  // };

  return User;
};

module.exports = User;
