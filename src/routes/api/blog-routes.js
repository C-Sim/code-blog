const router = require("express").Router();

const {
  getBlogs,
  getBlogsByUserId,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
} = require("../../controllers/api/blogs");

router.get("/", getBlogs);
router.get("/:id", getBlogsByUserId);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id", updateBlogById);
router.delete("/:id", deleteBlogById);

module.exports = router;
