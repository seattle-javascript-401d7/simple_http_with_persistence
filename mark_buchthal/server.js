
const http = require('http');
const fs = require('fs');

var port = 3000;
var filePath = __dirname + '/db/';
var fileName;
var newFile;
var ext = '.json';
const server = module.exports = exports = http.createServer((req, res) => {

  if (req.method === 'POST' && req.url === '/quotes') {
    fs.readdir(filePath, (err, files) => {
      if (err) throw err;

      fileName = 'file_' + files.length;
      newFile = fs.createWriteStream(filePath + fileName + ext);
      req.pipe(newFile);
    });

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/JSON' });
      return res.end();
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/quotes') {
    fs.readdir(filePath, (err, files) => {
      if (err) throw err;

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(files.toString());
      return res.end();
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('404 error');
  return res.end();
});

server.listen(port, () => {
  console.log('server is listening...');
});
