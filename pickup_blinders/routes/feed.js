const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();


// Sorted by Newest
router.get('/feed/funny/newest', (req, res, next) => {
  Post.find({ category: "funny" }).sort({ created_at: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/tinder/newest', (req, res, next) => {
  Post.find({ category: "tinder" }).sort({ created_at: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/cute/newest', (req, res, next) => {
  Post.find({ category: "cute" }).sort({ created_at: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/smart/newest', (req, res, next) => {
  Post.find({ category: "smart" }).sort({ created_at: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

// Sorted by Rating

router.get('/feed/funny/best', (req, res, next) => {
  Post.find({ category: "funny" }).sort({ score: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/tinder/best', (req, res, next) => {
  Post.find({ category: "tinder" }).sort({ score: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/cute/best', (req, res, next) => {
  Post.find({ category: "cute" }).sort({ score: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});

router.get('/feed/smart/best', (req, res, next) => {
  Post.find({ category: "smart" }).sort({ score: -1 }).populate("userid").then(post => {
    res.render('funny', { post: post });
  }).catch(err => {
    console.log(err)
  })
});


// Voting Up and Down
router.post("/vote/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $inc: { score: 1 } }, { new: true }).then(post => {
    res.json(post.score);
  })
})

router.post("/downvote/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $inc: { score: -1 } }, { new: true }).then(post => {
    res.json(post.score);
  })
})

// Ajax && Axios Search

// router.get("/posts",(req,res)=>{
//   Post.find().then(responseDB=>{
//     console.log(responseDB)
//     res.json(responseDB)
//   })
// })

module.exports = router;
