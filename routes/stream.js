var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
var shell = require('shelljs');
var request = require('request');
const m3u8 = require('m3u8-stream-list')
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
      }
    })
  })
  // http.createServer(function(request,response){
  //   response.writeHead(200,{'Content-Type':'video/m3u8'});
  //   fs.createReadStream('./public/stream/'+dir[1]+'/'+dir[2]).pipe(response)
  // }).listen(8000)

  console.log(fs.statSync('./public/stream/'+dir[1]+'/'+dir[2]))
  console.log(fs.statSync('./routes/249414131.m3u8'))


  // var server = http.createServer()
  // var hls = new HLSServer(server, {
  //   path: '/stream'+query,     // Base URI to output HLS streams
  //   dir: path  // Directory that input files are stored
  // })

})

module.exports = router;
