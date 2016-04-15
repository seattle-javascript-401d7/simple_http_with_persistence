const http = require('http');

const server = module.exports = http.createServer((req, res) => {
  res.writeHead(200, {
    debugger;
    'Content-Type': 'application/json'
  });
  res.write('{'msg': 'hello/world\n'}')
  res.end();
}).listen(3000, () => console.log('server up'));
