const { Blog, User, Comment } = require("../../models");

const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

const renderSignupPage = (req, res) => {
  return res.render("signup", { currentPage: "signup" });
};

const renderHomePage = async (req, res) => {
  const { isLoggedIn } = req.session;

  try {
    const blogsFromDb = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    if (!blogsFromDb) {
      return res.status(500).json({ message: "Blogs not found" });
    }

    const blogs = blogsFromDb.map((blog) => {
      return blog.get({ plain: true });
    });

    return res.render("home", {
      currentPage: "home",
      isLoggedIn,
      blogs: blogs,
    });
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

const renderBlogPage = async (req, res) => {
  const { isLoggedIn } = req.session;

  let currentUser;

  if (isLoggedIn) {
    currentUser = req.session.user.id;
  }

  const { id } = req.params;

  const blogFromDb = await Blog.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["username", "id"],
      },
      {
        model: Comment,
        attributes: ["content", "userId", "blogId", "createdAt", "id"],
        include: [
          {
            model: User,
            attributes: ["username", "id"],
          },
          // {
          //   model: Blog,
          //   attributes: "id",
          // },
        ],
      },
    ],
  });

  const blog = blogFromDb.get({ plain: true });

  return res.render("blog", {
    blog: blog,
    currentUser: currentUser,
    isLoggedIn,
  });
};

module.exports = {
  renderLoginPage,
  renderSignupPage,
  renderHomePage,
  renderBlogPage,
};
