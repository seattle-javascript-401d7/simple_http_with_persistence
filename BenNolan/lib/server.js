const http = require('http');
const fs = require('fs');
const dir = __dirname + '/../notes';

if (!fs.existsSync(dir)) {
 fs.mkdirSync(dir);
 }

const server = module.exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/notes') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var files = fs.readdirSync(dir);
    res.write('' + files);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/notes') {
    const text = fs.createWriteStream(__dirname + '/../notes/note_' + Date.now() + '.txt');
    req.pipe(text);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('{ "Hello": "from json"}');
    return res.end();
  }


  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('<h1>Error 404!</h1>');
  return res.end();
});

server.listen(3000, () => process.stdout.write('server up on 3000!'));
