const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");
const hpBlog = $("#hp-blog");
const blogCreateForm = $("#blog-create-form");

const handleSignUp = async (event) => {
  event.preventDefault();

  const payload = {
    username: $("#username").val(),
    password: $("#password").val(),
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
    console.log("ERROR");
  }
};

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="mb-3 text-center text-danger error-text">
    ${message}
  </div>`);
};

// const handleSignup = async (event) => {
//   event.preventDefault();

//   const username = $("#username").val();
//   const password = $("#password").val();
//   const confirmPassword = $("#confirmPassword").val();

//   if (username && password && confirmPassword) {
//     if (password === confirmPassword) {
//       try {
//         const payload = {
//           username,
//           password,
//         };

//         const response = await fetch("/auth/signup", {
//           method: "POST",
//           body: JSON.stringify(payload),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await response.json();

//         if (data.success) {
//           window.location.assign("/login");
//         } else {
//           renderError("signup-error", "Failed to create account. Try again.");
//         }
//       } catch (error) {
//         renderError("signup-error", "Failed to create account. Try again.");
//       }
//     } else {
//       renderError("signup-error", "Passwords do not match. Try again.");
//     }
//   } else {
//     renderError("signup-error", "Please complete all required fields.");
//   }
// };

const handleLogin = async (event) => {
  event.preventDefault();

  const payload = {
    username: $("#username").val(),
    password: $("#password").val(),
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
    console.log("ERROR");
  }

  // const username = $("#username").val();
  // const password = $("#password").val();

  // if (username && password) {
  //   try {
  //     const payload = {
  //       username,
  //       password,
  //     };

  //     const response = await fetch("/auth/login", {
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       window.location.assign("/dashboard");
  //     } else {
  //       renderError("login-error", "Failed to login. Try again.");
  //     }
  //   } catch (error) {
  //     renderError("login-error", "Failed to login. Try again.");
  //   }
  // } else {
  //   renderError("login-error", "Please complete all required fields.");
  // }
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

  const payload = {
    blogId,
  };

  console.log(payload);

  try {
    const response = await fetch(`/blog/${blogId}`, {
      method: "GET",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      return res.render("blog", { blog: data });
    } else {
      renderError("blog-error", "Failed to retrieve blog. Please try again.");
    }
  } catch (error) {
    renderError("blog-error", "Failed to retrieve blog. Please try again.");
  }
};

handleCreateBlog = async (event) => {
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

signupForm.submit(handleSignUp);
loginForm.submit(handleLogin);
logoutBtn.click(handleLogout);
hpBlog.click(handleViewBlog);
blogCreateForm.submit(handleCreateBlog);
