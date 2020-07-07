const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const { populate } = require('../models/User');

const router = express.Router();

router.get('/feed/funny', (req, res, next) => {
  Post.find({ category: "funny" }).sort({ created_at: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/tinder', (req, res, next) => {
  Post.find({ category: "tinder" }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/cute', (req, res, next) => {
  Post.find({ category: "cute" }).sort({ created_at: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/smart', (req, res, next) => {
  Post.find({ category: "smart" }).sort({ created_at: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.post("/vote/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {$inc: {score: 1}}, {new: true}).then(post => {
    res.json(post.score); 
  })
})

router.post("/downvote/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {$inc: {score: -1}}, {new: true}).then(post => {
    res.json(post.score); 
  })
})




module.exports = router;
