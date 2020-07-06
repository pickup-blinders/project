const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const { populate } = require('../models/User');

const router  = express.Router();

router.get('/feed/funny', (req, res, next) => {
  Post.find().populate("userid").then(post => {
    res.render('funny', {post: post});
  }).catch(err => {
    console.log(err)
  })
});

module.exports = router;
