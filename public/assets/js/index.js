const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");

const handleSignUp = async (event) => {
  event.preventDefault();

  const payload = {
    email: $("#email").val(),
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

const handleLogin = async (event) => {
  event.preventDefault();

  const payload = {
    email: $("#email").val(),
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

signupForm.submit(handleSignUp);
loginForm.submit(handleLogin);
logoutBtn.click(handleLogout);
