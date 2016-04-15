const http = require('http');
const fs = require('fs');

var slothbearServer = module.exports = exports = http.createServer((req, res) => {
  // post json data to new json file in /data (0 based index filename .json)
  if (req.method === 'POST' && req.url === '/notes') {
    fs.readdir(__dirname + '/data', (err, files) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Some error');
        return res.end();
      }
      req.pipe(fs.createWriteStream(__dirname + '/data/' + files.length + '.json'));
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('file stored as ' + files.length + '.json');
        return res.end();
      });
    });
    return;
  }
  // list number of files in /data
  if (req.method === 'GET' && req.url === '/notes') {
    fs.readdir(__dirname + '/data', (err, files) => {
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
    if (fileName.split('.')[1] !== 'json') {
      fileName += '.json';
    }
    var readStream = fs.createReadStream(__dirname + '/data/' + fileName);
    var readData = '';
    readStream.on('data', (data) => {
      readData += data;
    });

    readStream.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      console.log(readData);
      res.write(readData);
      return res.end();
    });
  }
  // send an error for all other routes
  if (!req.url.startsWith('/notes')) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404: delicious ants not found');
    return res.end();
  }
});

slothbearServer.listen(3000, () => console.log('server up on 3000'));
