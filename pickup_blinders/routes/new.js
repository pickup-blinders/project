const express = require('express');
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.get('/new', (req, res, next) => {
  res.render('newpost');
});

router.post('/new', (req, res, next) => {
  const { content, score = 0, userid = req.user._id, comments = [], category} = req.body; 
  Post.create({content, score, userid, comments, category})
    .then((post) => {
      console:
      User.findByIdAndUpdate(userid,{$push:{posts:post}}).then(
        response=>{
          console.log(post)
          console.log(userid)
          res.redirect('/feed/funny/newest');

        }
      )
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
