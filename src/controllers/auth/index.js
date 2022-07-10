const { User } = require("../../models");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // if (!user || !password) {
    //   renderError("signup-error", "Please complete all required fields.");
    // }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log(
        `[ERROR]: Failed to login | No user with username of ${username}`
      );

      return res.status(500).json({ success: false });
    }

    const isAuthorised = await user.checkPassword(password);

    if (isAuthorised) {
      req.session.save(() => {
        req.session.isLoggedIn = true;
        req.session.user = user.getUser();
        return res.json({ success: true });
      });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (user) {
      console.log(
        `[ERROR]: Failed to create user | username of ${username} already exists`
      );

      return res.status(500).json({ success: false });
    }

    const data = await User.create({
      username,
      password,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const logout = (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.destroy(() => {
      return res.status(204).end();
    });
  } else {
    return res.status(404).end();
  }
};

module.exports = {
  login,
  signup,
  logout,
};
