var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var url = require('url');
var shell = require('shelljs');
var request = require('request');
const m3u8 = require('m3u8-stream-list')
var HLSServer = require('hls-server')



router.get('/', function(req, res){
  var query = req.query.hlsurl
  var dir = request(query).uri.pathname.split('/')
  shell.mkdir('-p', 'public/stream/'+dir[1])
  request(query).pipe(fs.createWriteStream('./public/stream/'+dir[1]+'/'+dir[2]))
  // http.createServer(function(request,response){
  //   response.writeHead(200,{'Content-Type':'video/m3u8'});
  //   fs.createReadStream('./public/stream/'+dir[1]+'/'+dir[2]).pipe(response)
  // }).listen(8000)

  res.writeHead(200,{'Content-Type':'video/m3u8'});
  fs.createReadStream('./routes/249414131.m3u8').pipe(res)


  // var server = http.createServer()
  // var hls = new HLSServer(server, {
  //   path: '/stream'+query,     // Base URI to output HLS streams
  //   dir: path  // Directory that input files are stored
  // })

})

module.exports = router;
