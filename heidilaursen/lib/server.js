const http = require('http');
const fs = require('fs');

module.exports = exports = function startServer(directory, cb) {
  const dir = directory || __dirname + '/files';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/files') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      var doc = fs.readdirSync(dir);
      res.write(doc.toString());
      return res.end();
    }
    if (req.method === 'POST' && req.url === '/files') {
      var nextDoc = fs.readdirSync(dir).length + 1;
      const writetoDoc = fs.createWriteStream(dir + '/' + nextDoc + '.json');
      req.pipe(writetoDoc);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('json doc saved ' + nextDoc + '.json');
      return res.end();
    }
  });

  server.listen('3000', () => {
    process.stdout.write('server is up on port 3000');
  });
  if (cb && typeof cb === 'function') {
    cb();
    return server;
  }
};
