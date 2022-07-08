const { Router } = require("express");
const {
  renderLoginPage,
  renderSignupPage,
  renderHomePage,
} = require("../../controllers/views/publicViews");

const router = Router();

router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/", renderHomePage);

module.exports = router;
