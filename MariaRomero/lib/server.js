const http = require('http');
const records = require(__dirname + '/records');

const server = http.createServer( (req, res) => {
  if (req.method === 'GET' && req.url === '/records') {
    res.writeHead(200, { 'Content-Type': 'text/plain' } );
    res.write(records.displayFiles());
    return res.end();
  }
  if (req.method === 'POST' && req.url === '/records') {
    req.on('data', (data) => {
      records.write(data);
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.write('file written');
      return res.end();
    });
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' } );
  res.write('error 404: not found');
  return res.end();
});

server.listen(3000, () => {
  process.stdout.write('server up on port 3000');
});
