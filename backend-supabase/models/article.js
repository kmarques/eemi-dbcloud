const connection = require("./db");
const { Model, DataTypes } = require("sequelize");
const User = require("./user");

class Article extends Model {}

Article.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "DRAFT",
      //validate: {
      //  isIn: ["DRAFT", "PUBLISHED"],
      //},
    },
  },
  {
    sequelize: connection,
  }
);

Article.belongsTo(User);
User.hasMany(Article);

module.exports = Article;
