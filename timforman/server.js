'use strict';

const fs = require('fs');
const http = require('http');

const server = module.exports = exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/list') {
    fs.readdir(__dirname + '/data/', (err, data) => {
      if (err) return err;
      var fileList = '<h2>Files in data folder</h2><ol>';
      data.forEach((data) => {
        fileList += '<li>' + data + '</li>';
      });
      fileList += '</ol>';
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(fileList + '\n');
      return res.end();
    });
    return;
  }
  if (req.method === 'POST' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    req.on('data', (data) => {
      var path = 'data/' + Date() + '.json';
      res.write(data);
      fs.writeFile(path, data, (err) => {
        if (err) return 'Error';
        console.log(Date() + ' file saved.');
        return res.end();
      });
    });
    return;
  }
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({ msg: 'Not Found'}));
  res.end();
});
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
