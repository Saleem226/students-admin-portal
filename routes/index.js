var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
const studentRouter=require('./students')


/* GET home page. */

router.get('/', function(req, res, next) {
  res.redirect('/students/');
});

router.use('/users', usersRouter);
router.use('/students',studentRouter)

module.exports = router;
