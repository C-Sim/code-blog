const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

Blog.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Blog, {
  foreignKey: "userId",
});

Comment.belongsTo(Blog, {
  foreignKey: "blogId",
  onDelete: "CASCADE",
});

Blog.hasMany(Comment, {
  foreignKey: "blogId",
});

module.exports = { User, Blog, Comment };
