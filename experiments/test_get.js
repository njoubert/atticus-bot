const http = require('http');
const crypto = require('crypto');

var options = {
  host: 'www.njoubert.com',
  port: 80,
  path: '/',
  method: 'GET'
};

var hash = crypto.createHash('sha256');

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    hash.update(chunk);
  });
  res.on('end', function() {
    console.log(hash.digest('hex'));
  });  
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
// req.write('data\n');
// req.write('data\n');
req.end();