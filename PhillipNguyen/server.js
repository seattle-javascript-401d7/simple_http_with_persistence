'use strict';
const http = require('http');
const fs = require('fs');

let counter = fs.readdirSync(__dirname + '/data/').length;

module.exports = exports = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/data') {
    counter += 1;

    let logFile = fs.createWriteStream(__dirname + '/data/' + counter + '.json');
    req.pipe(logFile);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('{"msg": "success"}');
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/data') {
   res.writeHead(200, { 'Content-Type': 'text/plain' });
   fs.readdirSync(__dirname + '/data/').forEach((e) => {
     res.write(e + '\n');
   });
   return res.end();
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write('{"msg": "404 error"}');
  res.end();

}).listen(3000, () => console.log('Server is up!'));
