var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
var shell = require('shelljs');
var request = require('request');
var m3u8 = require('m3u8')
var HLSServer = require('hls-server')



router.get('/', function(req, res){
  var query = req.query.hlsurl
  var dir = request(query).uri.pathname.split('/')
  var videoPath = './public/stream/'+dir[1]+'/'+dir[2]
  shell.mkdir('-p', 'public/stream/'+dir[1])

  request.get(query).pipe(fs.createWriteStream(videoPath)).on('close', function(){
    fs.readFile(videoPath,function(err,content){
      if (err) {
						res.writeHead(500);
						res.end();
					}
      else{
        res.writeHead(200,{'Content-Type':'video/application/vnd.apple.mpegurl'});
        res.end(content, 'utf-8')
        console.log(content)
      }
    })
    // var parser = m3u8.createStream()
    // var file = fs.createReadStream(videoPath)
    // console.log(videoPath)
    // file.pipe(parser)
    // parser.on('item',function(item){
    //   item.set('uri',videoPath)
    //   console.log(item)
    //   item.pipe(res)
    // })
  })



})

module.exports = router;
