const renderDashboardPage = (req, res) => {
  return res.render("dashboard", {
    user: req.session.user,
    currentPage: "dashboard",
  });
};

module.exports = { renderDashboardPage };
