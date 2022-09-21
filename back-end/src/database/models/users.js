const { Model, INTEGER, STRING } = require('sequelize');
const { User } = require('.');

class User extends Model {
  id!;
  username!;
  role!;
  email!;
  password!;
}
User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      allowNull: false,
      type: STRING,
    },
    role: {
      allowNull: false,
      type: STRING,
    },
    email: {
      allowNull: false,
      type: STRING,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

module.exports = User;