const { Comment } = require("../models");

const commentData = [
  {
    content: "I empathise!",
    userId: 2,
    blogId: 2,
  },

  {
    content:
      "I know a great site that can help you find a mentor...https://lit-atoll-12366.herokuapp.com/",
    userId: 3,
    blogId: 3,
  },
  {
    content: "I had a great mentor that I can recommend...DM me for details",
    userId: 4,
    blogId: 4,
  },
  {
    content: "Love this!",
    userId: 5,
    blogId: 5,
  },
  {
    content: "I feel your pain",
    userId: 6,
    blogId: 6,
  },
  {
    content: "You'll be fine...stay focused",
    userId: 7,
    blogId: 7,
  },
  {
    content:
      "How exciting...I'd love to hear more about what you've learnt and whether you'd recommend?",
    userId: 8,
    blogId: 8,
  },
  {
    content: "You can do it!!",
    userId: 1,
    blogId: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
