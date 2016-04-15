const fs = require('fs');
const http = require('http');


const server = module.exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/notes') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    var listFiles = fs.readdirSync(__dirname + '/data/');
    res.write(listFiles.toString());
    return res.end();
  }
  if (req.method === 'POST' && req.url === '/notes') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    req.on('data', (chunk) => {
        var listFiles = fs.readdirSync(__dirname + '/data/');
        listFiles = listFiles.length + 1;
        // var uniqueName = new Date().toISOString();
        fs.writeFile(__dirname + '/data/' + listFiles + '.json', chunk);
        console.log('new file created');
        res.write(chunk);
        return res.end();
      });
    return;
}
res.writeHead(418, { 'Content-Type': 'text/plain' });
res.write('418 Error, I am a teapot');
res.end();
});

server.listen(3000, () => process.stdout.write('Server Live\n'));
