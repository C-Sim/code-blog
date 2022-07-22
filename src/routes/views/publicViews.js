const { Router } = require("express");
const {
  renderLoginPage,
  renderSignupPage,
  renderHomePage,
  renderBlogPage,
} = require("../../controllers/views/publicViews");

const router = Router();

router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/", renderHomePage);
router.get("/:id", renderBlogPage);

module.exports = router;
