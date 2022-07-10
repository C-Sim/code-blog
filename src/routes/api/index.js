const router = require("express").Router();
const blogRoutes = require("./blog-routes");

router.use("/categories", blogRoutes);

module.exports = router;
