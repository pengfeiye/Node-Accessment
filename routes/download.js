var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/:path/:folder/:file', function(req, res, next) {
  var url = './public/stream/'+req.params.path+'/'+req.params.folder+'/'+req.params.file
  fs.readFile(url,function(err,content){
    if (err) {
  				res.writeHead(500);
  				res.end();
  			}
    else{
      res.writeHead(200,{'Content-Type':'video/application/vnd.apple.mpegurl'});
      res.end(content, 'utf-8')
    }
  })

});

module.exports = router;
