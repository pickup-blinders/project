const express = require('express');
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.get('/new', (req, res, next) => {
  res.render('newpost');
});

router.post('/new', (req, res, next) => {
  const { content, score, userid = req.user._id, comments = [], category} = req.body; 
  Post.create({content, score, userid, comments, category})
    .then(() => {
      res.redirect('/feed/funny');
    })
    .catch(err => {
      next(err);
    })
});

// router.post('/feed/funny', (req, res, next) => {
//   Post.update({score})
//     .then((post) => {
//       post.score++
//       res.redirect('/feed/funny');
//     })
//     .catch(err => {
//       next(err);
//     })
// });

module.exports = router;
