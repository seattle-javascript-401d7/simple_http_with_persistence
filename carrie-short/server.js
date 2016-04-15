const http = require('http');
const fs = require('fs');

function startServer(directory,cb) {
  console.log('server started');
  const dir = directory || __dirname + '/../notes';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/notes') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      var files = fs.readdirSync(dir);
      res.write(files.toString());
      return res.end();
    }
  });

  server.listen('3000', () => {
    process.stdout.write('server up\n');
  });
  cb();
}

module.exports = startServer;
