const { Blog } = require("../models");

const blogData = [
  {
    title: "Are you ready?",
    content:
      "Let's do this! 24 weeks sounds like longer than it is...it'll be over in no time.",
    userId: 1,
  },

  {
    title: "Help",
    content:
      "No idea what I'm doing - I have a code quiz assignment and cannot get my head around Javascript!!",
    userId: 2,
  },
  {
    title: "I need somebody",
    content:
      "This is more challenging than I expected. Can anyone recommend a good mentor?",
    userId: 2,
  },
  {
    title: "Not just anybody",
    content:
      "I've had a few recommendations for some mentors, but would ideally like someone who's gone through the intensity of a bootcamp so that they can really understand what I'm going through - any recommendations please???",
    userId: 2,
  },
  {
    title: "Yes it is!",
    content:
      "Working as a group on a project is such a good opportunity to capitalise on your strengths to gain confidence and learn from others to improve your skills.",
    userId: 3,
  },
  {
    title: "Too many cooks",
    content:
      "The novelty of working as a gorup definitely wears off over time. Especially with last-minute merge conflicts when working from a single GitHub repo. Lesson learnt for next time!",
    userId: 3,
  },
  {
    title: "Hoping for the best, but expecting the worst",
    content:
      "Getting stuck into my second big group project. REally looking forward to working with a new team, but apprehensive about how it will go.",
    userId: 4,
  },
  {
    title: "Bring it on",
    content: "Ready for the next challenge of phase 3 - bring on React!",
    userId: 5,
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
