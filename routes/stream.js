var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var url = require('url');
var shell = require('shelljs');
var request = require('request');
var m3u8 = require('m3u8');

var parser = m3u8.createStream();

router.get('/', function(req, res){
  var query = req.query.hlsurl
  var dir = request(query).uri.pathname.split('/')
  shell.mkdir('-p', 'public/stream/'+dir[1])
  request(query).pipe(fs.createWriteStream('./public/stream/'+dir[1]+'/'+dir[2]))
  // var server = http.createServer(function(request,res){
  //   fs.readFile(__dirname + '/stream/'+dir[1]+'/'+dir[2], function(err,data){
  //     res.end(data)
  //   })
  // })
  //
  // server.listen(8000)

  var video = fs.statSync('./public/stream/'+dir[1]+'/'+dir[2])
  var video2 = fs.createReadStream('./public/test.txt')
  var path = './public/stream/'+dir[1]+'/'+dir[2]
  var range = req.headers.range
  var fileSize = video.size

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'hls',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'hls',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }



});

module.exports = router;
