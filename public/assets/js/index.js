const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");
const hpBlog = $("#hp-blog");
const blogCreateForm = $("#blog-create-form");
const updateBlog = $("#blog-edit-form");
const deleteBlog = $("#delete-blog-btn");
const addComment = $("#comment-form");
const updateComment = $("#comment-edit-form");
const deleteComment = $("#delete-comment-btn");

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="mb-3 text-center text-danger error-text">
    ${message}
  </div>`);
};

const handleSignUp = async (event) => {
  event.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  if (username && password && confirmPassword) {
    if (password === confirmPassword) {
      try {
        const payload = {
          username,
          password,
        };

        const response = await fetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          window.location.assign("/login");
        } else {
          renderError("signup-error", "Failed to create account. Try again.");
        }
      } catch (error) {
        renderError("signup-error", "Failed to create account. Try again.");
      }
    } else {
      renderError("signup-error", "Passwords do not match. Try again.");
    }
  } else {
    renderError("signup-error", "*Please complete all required fields.");
  }
};

const handleLogin = async (event) => {
  event.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();

  if (username && password) {
    try {
      const payload = {
        username,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        renderError("login-error", "Failed to login. Try again.");
      }
    } catch (error) {
      renderError("login-error", "Failed to login. Try again.");
    }
  } else {
    renderError("login-error", "Please complete all required fields.");
  }
};

const handleLogout = async () => {
  const response = await fetch("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 204) {
    window.location.assign("/login");
  } else {
    console.log("ERROR");
  }
};

const handleViewBlog = async (event) => {
  const target = $(event.target);

  let blogId;

  if (target.is('a[name="blog-title"]')) {
    blogId = target.attr("id");
  }

  window.location.assign(`/blog/${blogId}`);
};

const handleCreateBlog = async (event) => {
  event.preventDefault();

  const title = $("#title").val().trim();
  const content = $("#content").val().trim();

  if (title && content) {
    try {
      const payload = {
        title,
        content,
      };

      const response = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        renderError(
          "create-error",
          "Failed to create a new blog. Please try again."
        );
      }
    } catch (error) {
      renderError(
        "create-error",
        "Failed to create a new blog. Please try again."
      );
    }
  } else {
    renderError("create-error", "Please complete all required fields.");
  }
};

const handleEditBlog = async (event) => {
  event.preventDefault();

  const target = $(event.target);

  const blogId = target.attr("data-id");

  const title = $("#title").val().trim();
  const content = $("#content").val().trim();

  if (title && content) {
    try {
      const payload = {
        title,
        content,
      };

      console.log(payload);

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        renderError("edit-error", "Failed to update blog. Please try again.");
      }
    } catch (error) {
      renderError("edit-error", "Failed to update blog. Please try again.");
    }
  } else {
    renderError("edit-error", "Please complete all required fields.");
  }
};

const handleDeleteBlog = async (event) => {
  const target = $(event.target);

  const blogId = target.attr("data-id");

  try {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      window.location.assign("/dashboard");
    } else {
      renderError("edit-error", "Failed to delete blog. Please try again.");
    }
  } catch (error) {
    renderError("edit-error", "Failed to delete blog. Please try again.");
  }
};

const handleAddComment = async (event, req, res) => {
  event.preventDefault();

  const target = $(event.target);

  const blogId = target.attr("data-id");

  const content = $("#comment-input").val().trim();

  if (content) {
    try {
      const payload = {
        content,
        blogId,
      };

      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign(`/blog/${blogId}`);
      } else {
        renderError(
          "comment-error",
          "Failed to add comment. Please try again."
        );
      }
    } catch (error) {
      renderError("comment-error", "Failed to add comment. Please try again.");
    }
  } else {
    renderError("create-error", "Please complete all required fields.");
  }
};

const handleEditDeleteComment = async (event) => {
  event.preventDefault();
  const target = $(event.target);
  const blogId = target.attr("data-blog-id");
  const commentId = target.attr("data-id");
  const content = $(`#comment-${commentId}`).val().trim();

  if (target.is('button[name="update-comment-btn"]')) {
    handleEditComment(content, blogId, commentId);
  }

  if (target.is('button[name="delete-comment-btn"]')) {
    handleDeleteComment(blogId, commentId);
  }
};
const handleEditComment = async (content, blogId, commentId) => {
  if (content && blogId && commentId) {
    try {
      const payload = {
        content,
      };

      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign(`/blog/${blogId}`);
      } else {
        renderError(
          "comment-edit-error",
          "Failed to update comment. Please try again."
        );
      }
    } catch (error) {
      renderError(
        "comment-edit-error",
        "Failed to update comment. Please try again."
      );
    }
  } else {
    renderError("comment-edit-error", "Please complete all required fields.");
  }
};

const handleDeleteComment = async (blogId, commentId) => {
  if (blogId && commentId) {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign(`/blog/${blogId}`);
      } else {
        renderError(
          "edit-error",
          "Failed to delete comment. Please try again."
        );
      }
    } catch (error) {
      renderError("edit-error", "Failed to delete comment. Please try again.");
    }
  }
};

signupForm.submit(handleSignUp);
loginForm.submit(handleLogin);
logoutBtn.click(handleLogout);
hpBlog.click(handleViewBlog);
blogCreateForm.submit(handleCreateBlog);
updateBlog.submit(handleEditBlog);
deleteBlog.click(handleDeleteBlog);
addComment.submit(handleAddComment);
updateComment.click(handleEditDeleteComment);
