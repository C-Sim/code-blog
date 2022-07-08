const { Router } = require("express");
const { login, signup, logout } = require("../../controllers/auth");

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);

module.exports = router;
