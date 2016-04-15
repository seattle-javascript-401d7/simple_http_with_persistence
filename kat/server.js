const fs = require('fs');
const http = require('http');


const server = module.exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/notes') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('list of files within data');
    return res.end();
  }
  if (req.method === 'POST' && req.url === '/notes') {
    res.on('data', (chunk) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write();
    return res.end();
  });
  return;
}
res.writeHead(418, { 'Content-Type': 'text/plain' });
res.write('418 Error, I am a teapot');
res.end();
});

server.listen(3000, () => process.stdout.write('Server Live\n'));
