const { Router } = require("express");

const { renderDashboardPage } = require("../../controllers/views/privateViews");

const router = Router();

router.get("/dashboard", renderDashboardPage);

module.exports = router;
