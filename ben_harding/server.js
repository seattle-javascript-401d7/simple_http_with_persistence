const http = require('http');
const fs = require('fs');

var slothbear = module.exports = exports = {};

slothbear.server = function(port, savePath) {
  return http.createServer((req, res) => {
    // post json data to new json file in /data (0 based index filename .json)
    if (req.method === 'POST' && req.url === '/notes') {
      fs.readdir(savePath, (err, files) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Some error');
          return res.end();
        }

        req.pipe(fs.createWriteStream(savePath + '/' + files.length + '.json'));

        req.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('file stored as ' + files.length + '.json');
          return res.end();
        });
      });
      return;
    }
    // return list of files in /data
    if (req.method === 'GET' && req.url === '/notes') {
      fs.readdir(savePath, (err, files) => {
        if (err) return console.log(err);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('files stored: ' + files.join(', '));
        return res.end();
      });
    }
    // return note from the file at /data/_filename_.json
    // I don't think this was a part of the assignment, but it seemed
    // like the logical thing to do.
    if (req.method === 'GET' && req.url.startsWith('/notes/')) {
      var fileName = req.url.split('/')[2];
      if (fileName.split('.')[1] !== 'json') fileName += '.json';

      var readStream = fs.createReadStream(savePath + '/' + fileName);
      var readData = '';

      readStream.on('data', (data) => {
        readData += data;
      });

      readStream.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(readData);
        return res.end();
      });
    }
    // send an error for all other routes
    if (!req.url.startsWith('/notes' ||
        req.method === 'DELETE' ||
        req.method === 'PUT' ||
        req.method === 'PATCH')) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404: delicious ants not found');
      return res.end();
    }
  }).listen(port, () => console.log('server up on 3000'));
};
