const { Blog } = require("../../models");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();

    if (!blogs) {
      return res.status(500).json({ message: "No blogs found" });
    }

    // const formatBlogs = (each) => {
    //   const id = each.id;
    //   const title = each.title;
    //   const content = each.content;
    //   const userId = each.userId;
    //   const timestamp = each.createdAt;

    //   const response = {
    //     id,
    //     title,
    //     content,
    //     userId,
    //     timestamp,
    //   };
    //   return response;
    // };

    return res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const getBlogsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const blogs = await Blog.findOne({ where: { userId } });
    if (!blog) {
      return res.status(500).json({ message: "No blogs found" });
    }
    return res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(500).json({ message: "Blog not found" });
    }
    return res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const createBlog = async (req, res) => {
  try {
    const { title } = req.body;

    const blog = await Blog.findOne({ where: { title } });

    if (blog) {
      console.log(
        `[ERROR]: Failed to create blog | Blog of ${title} already exists`
      );

      return res.status(400).json({
        error: `Failed to create blog | Blog of ${title} already exists`,
      });
    }

    const newBlog = await Blog.create({
      title,
      content,
      userId,
    });

    return res.status(201).json({
      success: true,
      data: newBlog,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to create blog | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to create blog",
    });
  }
};

const updateBlogById = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;

    const blog = await Blog.findOne({ where: { id } });

    const existingBlog = await Blog.findOne({
      where: { title },
    });

    if (!blog) {
      console.log(`[ERROR]: Failed to find blog | No blog with id of ${id}`);

      return res.status(404).json({ error: "Failed to find blog" });
    }

    if (existingBlog) {
      console.log(
        `[ERROR]: Failed to update blog | Blog of ${title} already exists`
      );

      return res.status(400).json({
        error: `Failed to update blog | Blog of ${title} already exists`,
      });
    }

    await Blog.update(
      { title, content },
      {
        where: { id },
      }
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to update blog | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to update blog",
    });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.destroy({
      where: { id },
    });

    if (!blog) {
      console.log(`[ERROR]: Failed to find blog | No blog with id of ${id}`);

      return res.status(404).json({ error: "Failed to find blog" });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to delete blog | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to delete blog",
    });
  }
};

module.exports = {
  getBlogs,
  getBlogsByUserId,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
};
