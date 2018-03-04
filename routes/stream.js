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

  http.createServer(function(request, response) {
    var filePath = './public/stream/'+dir[1]+'/'+dir[2];
    var stat = fs.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'm3u8',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
  })
  .listen(2000);
});

module.exports = router;
