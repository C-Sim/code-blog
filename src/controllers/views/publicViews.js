const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

const renderSignupPage = (req, res) => {
  return res.render("signup", { currentPage: "signup" });
};

const renderHomePage = (req, res) => {
  const { isLoggedIn } = req.session;
  return res.render("home", { currentPage: "home", isLoggedIn });
};

module.exports = { renderLoginPage, renderSignupPage, renderHomePage };
