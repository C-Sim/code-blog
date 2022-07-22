const { Router } = require("express");

const {
  renderDashboardPage,
  renderCreateBlogPage,
  renderEditBlogPage,
} = require("../../controllers/views/privateViews");

const router = Router();

router.get("/dashboard", renderDashboardPage);
router.get("/create", renderCreateBlogPage);
router.get("/edit/:id", renderEditBlogPage);

module.exports = router;
