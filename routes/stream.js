var express = require('express');
var router = express.Router();
var fs = require('fs');
var shell = require('shelljs');
var request = require('request');



router.get('/', function(req, res){
  var query = req.query.hlsurl
  var dir = request(query).uri.pathname.split('/')
  var videoPath = './public/stream/'+ request(query).uri.host + '/' +dir[1]+'/'+dir[2]
  shell.mkdir('-p', 'public/stream/'+ request(query).uri.host + '/' + dir[1])
  var streamPath = '/stream/'+ request(query).uri.host + '/' +dir[1]+'/'+dir[2]

  request.get(query).pipe(fs.createWriteStream(videoPath)).on('close', function(){
    fs.readFile(videoPath,function(err,content){
      if (err) {
						res.writeHead(500);
						res.end();
					}
      else{
        res.writeHead(200,{'Content-Type':'video/application/vnd.apple.mpegurl'});
        res.end(content, 'utf-8')
      }
    })
  })


})

module.exports = router;
