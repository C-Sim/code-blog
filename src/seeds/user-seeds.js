const { User } = require("../models");

const userData = [
  {
    username: "playerone",
    password: "password1",
  },
  {
    username: "numbertwo",
    password: "password2",
  },
  {
    username: "threeisthemagicnumber",
    password: "password3",
  },
  {
    username: "foureveryoung",
    password: "password4",
  },
  {
    username: "fivewillmakeyougetdown",
    password: "password5",
  },
];

const seedUsers = async () => {
  const promises = userData.map((userData) => User.create(userData));
  await Promise.all(promises);
};

module.exports = seedUsers;
