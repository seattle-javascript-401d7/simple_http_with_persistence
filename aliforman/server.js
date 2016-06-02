const http = require('http');
const fs = require('fs');

const server = module.exports = exports = http.createServer( (req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/lib/index.html', (err, data) => {
      if (err) return 'Error';
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
    return;
  }
  if (req.method === 'GET' && req.url === '/greet') {
    fs.readFile(__dirname + '/lib/index.html', (err, data) => {
      if (err) return 'Error';
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
    return;
  }
  if (req.method === 'GET' && req.url === '/greet/list') {
    fs.readdir(__dirname + '/data/', (err, data) => {
      if (err) return 'Error';
      var greetList = '<h1> List of .json files in /greet:</h1><ol>';
      data.forEach((data) => {
        greetList += '<li>' + data + '</li>';
      });
      greetList += '</ol>';
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(greetList + '\n');
      res.end();
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    req.on('data', (data) => {
      var path = 'data/' + Date() + '.json';
      res.write(data);
      fs.writeFile(path, data, (err) => {
        if (err) return 'Error';
        console.log(Date() + ' file saved.');
        res.end();
      });
    });
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('Page Not Found.  Try again.');
  res.end();
});

server.listen(3000, () => {
  process.stdout.write('server up on port 3000');
});

