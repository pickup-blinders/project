const express = require('express');
const router  = express.Router();

router.get('/new', (req, res, next) => {
  res.render('newest');
});

module.exports = router;
