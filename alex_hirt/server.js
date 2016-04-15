const http = require('http');
const routes = require(__dirname + '/lib/router.js');

const port = process.env.PORT || 5000;

const server = http.createServer((request, response) => {
  response.write('<h1>Hello</h1>');
});

server.listen(port, () => {
  process.stdout.write('Server listening on localhost:' + port + '\n');
});
