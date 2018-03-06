var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var path = request.query.path
  
});

module.exports = router;
