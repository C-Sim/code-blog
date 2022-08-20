const router = require("express").Router();

const {
  updateCommentById,
  addCommentToBlog,
  deleteCommentFromBlog,
} = require("../../controllers/api/comments");

router.post("/", addCommentToBlog);
router.put("/:id", updateCommentById);
router.delete("/:id", deleteCommentFromBlog);

module.exports = router;
