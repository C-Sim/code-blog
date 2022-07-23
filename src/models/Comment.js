const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");
const User = require("./User");
const Blog = require("./Blog");

class Comment extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [2, 500],
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Blog,
      key: "id",
    },
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  freezeTableName: true,
  modelName: "comment",
};

Comment.init(schema, options);

module.exports = Comment;
