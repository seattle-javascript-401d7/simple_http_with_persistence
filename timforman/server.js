const fs = require('fs');
const http = require('http');
const dataDir = __dirname + '/data/';

var fileCount = 0;

var server = module.exports = exports = http.createServer((req, res) => {
  if (req.url.startsWith('/greet')) {
    var filename = req.url.split('/')[2];
    if (req.method === 'GET') {
      fs.readFile(dataDir + filename + '.json', (err, data) => {
        if (err) return err;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data.toString());
        res.end();
      });
    }
    if (req.method === 'POST') {
      var body = '';
      filename = filename || ++fileCount;
      req.pipe(fs.createWriteStream(dataDir + filename + '.json'));
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(body);
        res.end();
      });
    }
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({ msg: 'Not Found'}));
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
