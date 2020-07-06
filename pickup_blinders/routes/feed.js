const express = require('express');
const router  = express.Router();

router.get('/feed/funny', (req, res, next) => {
  res.render('funny');
});

module.exports = router;
