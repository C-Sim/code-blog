const { Router } = require("express");

const {
  renderDashboardPage,
  renderCreateBlogPage,
} = require("../../controllers/views/privateViews");

const router = Router();

router.get("/dashboard", renderDashboardPage);
router.get("/create", renderCreateBlogPage);

module.exports = router;
