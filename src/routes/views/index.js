const { Router } = require("express");

const publicViews = require("./publicViews");
const privateViews = require("./privateViews");
const auth = require("../../middlewares/auth");

const router = Router();

router.use(publicViews);
router.use(auth, privateViews);

module.exports = router;
