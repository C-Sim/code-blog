const { Router } = require("express");

const {
  renderDashboardPage,
  renderCreateBlogPage,
  renderEditBlogPage,
  renderAddCommentPage,
} = require("../../controllers/views/privateViews");

const router = Router();

router.get("/dashboard", renderDashboardPage);
router.get("/create", renderCreateBlogPage);
router.get("/edit/:id", renderEditBlogPage);
router.get("/comment", renderAddCommentPage);

module.exports = router;
