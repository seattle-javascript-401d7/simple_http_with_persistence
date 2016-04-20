const http = require('http');
const fs = require('fs');

function startServer(directory, cb) {
  const dir = directory || __dirname + '/../notes';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const server = module.exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/notes') {
    fs.readdir(dir, (err, files) => {
      if (err) return process.stdout.write(err);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(files.toString());
      res.end();
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/notes') {
    fs.readdir(dir, (err, files) => {
      if (err) return process.stdout.write(err);
      var nextFile = files.length + 1;
      const writeToFile = fs.createWriteStream(dir + '/' + nextFile + '.json');
        req.pipe(writeToFile);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('file created');
        return res.end();
      });
      return;
  }


  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('<h1>Error 404!</h1>');
  return res.end();
});

server.listen(3000, () => {
  process.stdout.write('server up\n');
});

if (cb && typeof cb === 'function') cb();
return server;

}
module.exports = startServer;
