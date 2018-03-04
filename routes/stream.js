var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var url = require('url');
var shell = require('shelljs');
var request = require('request');


router.get('/', function(req,res){
  var query = req.query.hlsurl
  var dir = request(query).uri.pathname.split('/')
  shell.mkdir('-p', 'public/stream/'+dir[1])
  request(query).pipe(fs.createWriteStream('./public/stream/'+dir[1]+'/'+dir[2]))
  res.json(fs.createReadStream('./public/stream/'+dir[1]+'/'+dir[2]))
});

module.exports = router;
