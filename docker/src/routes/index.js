'use strict';
var express = require('express');
var router = express.Router();

var feedController = require('../controllers/feedController');

// GET: /
router.get('/', function(req, res) {
  feedController.getFeeds().then(function(data){
    res.render('index/index', {
      data: data
    });
  });
});

router.delete('/deleteFeed', function(req, res){
  feedController.deleteFeed(req.query.id).then(function(resp){
    res.send(resp);
  });
});

module.exports = router;
