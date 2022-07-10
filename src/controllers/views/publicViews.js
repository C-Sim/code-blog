const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

const renderSignupPage = (req, res) => {
  return res.render("signup", { currentPage: "signup" });
};

const renderHomePage = (req, res) => {
  const { isLoggedIn } = req.session;
  return res.render("home", { currentPage: "home", isLoggedIn });

  // Alt method - import path if needed
  // const filePath = path.join(__dirname, "../../../public/publicHome.html");
  // return res.sendFile(filePath);
};

module.exports = { renderLoginPage, renderSignupPage, renderHomePage };
