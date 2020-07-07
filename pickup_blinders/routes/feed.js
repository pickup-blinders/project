const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')
const { populate } = require('../models/User');

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


// find user profile

//... showing his/her posts

router.get('/profile_posts/:id', (req, res, next) => {
  User.findById( req.params.id ).sort({ score: -1 }).populate("posts").then(user => {
    
    res.render('profile_posts', { user: user });
    console.log(user)
  }).catch(err => {
    console.log(err)
  })
});

//... showing his/her comments

router.get('/profile_comments/:id', (req, res, next) => {
  User.findById( req.params.id ).sort({ score: -1 }).populate("posts.comments").then(user => {
    res.render('profile_posts', { user: user });
    console.log(user)
  }).catch(err => {
    console.log(err)
  })
});



//render comments


router.post('/comments/:id', (req, res, next) => {

  console.log(req.user._id, req.params.id);
  
 
  const { content, score = 0, userid = req.user._id, postid = req.params.id} = req.body; 
  Comment.create({content, score, userid, postid })
    .then((comment) => {
      console.log(comment)
      User.findByIdAndUpdate(userid,{$push:{comments: comment}}).then(
        response=>{
          console.log(comment)
          console.log(userid)
          res.redirect('/comments/:id');

        },
      Post.findByIdAndUpdate(postid,{$push:{comments: comment}}).then(
        response=>{
          console.log(comment)
          console.log(postid)
          res.redirect('/comments/:id');
  
          }
      ))
    })
    .catch(err => {
      next(err);
    })
})

router.get('/comments/:id', (req,res, next) => { 

  let ident = req.params.id;
  Comment.findById( ident ).sort({ score: -1}).then(comment => { 
    res.render('comments', { comment: comment, ident: ident }
  )})

})


// Ajax && Axios Search

// router.get("/posts",(req,res)=>{
//   Post.find().then(responseDB=>{
//     console.log(responseDB)
//     res.json(responseDB)
//   })
// })

module.exports = router;
