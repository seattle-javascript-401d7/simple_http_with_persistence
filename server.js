const http = require('http');
const fs = require('fs');

const dir = __dirname + '/notes';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const server = module.exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/notes') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    var files = fs.readdirSync(dir);
    res.write(files.toString());
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/notes') {
    var nextFile = fs.readdirSync(dir).length + 1;
    const text = fs.createWriteStream(__dirname + '/notes/note_' + nextFile + '.json');
    req.pipe(text);
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('file created');
    return res.end();
  }

  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.write('this be a 404, yo');
  return res.end();

});

server.listen(3000, () => console.log('Server has started on port 3000'));
