'use strict';
const http = require('http');
const fs = require('fs');

module.exports = exports = http.createServer((req, res) => {

  if (req.method === 'POST' && req.url === '/data') {
    return fs.readdir(__dirname + '/data/', (err, files) => {
      if (err) throw err;
      let logFile = fs.createWriteStream(__dirname + '/data/' + files.length + '.json');
      req.pipe(logFile);
      req.on('data', (data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
        res.end();
      });
    });
  }
  if (req.method === 'GET' && req.url === '/data') {
    return fs.readdir(__dirname + '/data/', (err, files) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      files.forEach((e) => {
        res.write(e + '\n');
      });
      res.end();
    });
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write('{"msg": "404 error"}');
  res.end();

}).listen(3000, () => console.log('Server is up!'));
