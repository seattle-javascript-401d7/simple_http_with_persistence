const http = require('http');
const fs = require('fs');

module.exports = exports = function startServer(directory, cb) {
  const dir = directory || __dirname + '/../simple';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/simple') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      var files = fs.readdirSync(dir);
      res.write(files.toString());
      return res.end();
    }
    if (req.method === 'POST' && req.url === '/simple') {
      var nextFile = fs.readdirSync(dir).length + 1;
      const writeToFile = fs.createWriteStream(dir + '/' + nextFile + '.json');
      req.pipe(writeToFile);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('saved file ' + nextFile + '.json');
      return res.end();
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 - Page not found');
    return res.end();
  });

  server.listen('3000', () => {
    process.stdout.write('server up\n');
  });
  if (cb && typeof cb === 'function') cb();
  return server;
}
