const router = require("express").Router();
const blogs = require("./blogs");
const comments = require("./comments");

router.use("/blogs", blogs);
router.use("/comments", comments);

module.exports = router;
