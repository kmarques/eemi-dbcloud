const connection = require("./db");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 4,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = User;
