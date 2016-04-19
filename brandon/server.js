const http = require('http');
const fs = require('fs');

const dir = __dirname + '/notes';

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
      const text = fs.createWriteStream(__dirname + '/notes/note_' + nextFile + '.json');
      req.pipe(text);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('file created');
      res.end();
    });
    return;
  }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('this be a 404, yo');
    return res.end();
  });

server.listen(3000, () => console.log('Server has started on port 3000'));
