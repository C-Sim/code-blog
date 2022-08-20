const { Comment } = require("../../models");

const addCommentToBlog = async (req, res) => {
  try {
    const { content, blogId } = req.body;

    const userId = req.session.user.id;

    const newComment = await Comment.create({
      content,
      userId,
      blogId,
    });

    return res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to add comment | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to add comment",
    });
  }
};

const deleteCommentFromBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.destroy({
      where: { id },
    });

    if (!comment) {
      console.log(
        `[ERROR]: Failed to find comment | No comment with id of ${id}`
      );

      return res.status(404).json({ error: "Failed to find comment" });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to delete comment | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to delete comment",
    });
  }
};

const updateCommentById = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    const comment = await Comment.findOne({ where: { id } });

    if (!comment) {
      console.log(
        `[ERROR]: Failed to find comment | No comment with id of ${id}`
      );

      return res.status(404).json({ error: "Failed to find comment" });
    }

    await Comment.update(
      { content },
      {
        where: { id },
      }
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to update comment | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to update comment",
    });
  }
};

module.exports = {
  addCommentToBlog,
  deleteCommentFromBlog,
  updateCommentById,
};
