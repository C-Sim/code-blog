const { Blog, User } = require("../../models");

const renderDashboardPage = async (req, res) => {
  try {
    const blogsFromDb = await Blog.findAll({
      where: {
        userId: req.session.user.id,
      },
    });

    if (!blogsFromDb) {
      return res.status(500).json({ message: "You don't have any blogs yet." });
    }

    const blogs = blogsFromDb.map((blog) => {
      return blog.get({ plain: true });
    });

    return res.render("dashboard", {
      currentPage: "dashboard",
      blogs: blogs,
    });
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

const renderCreateBlogPage = async (req, res) => {
  try {
    return res.render("createBlog");
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

module.exports = { renderDashboardPage, renderCreateBlogPage };
