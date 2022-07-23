const router = require("express").Router();

const {
  updateCommentById,
  addCommentToBlog,
  deleteCommentFromBlog,
} = require("../../controllers/api/blogs");

router.post("/", addCommentToBlog);
router.put("/:id", updateCommentById);
router.delete("/:id", deleteCommentFromBlog);

module.exports = router;
