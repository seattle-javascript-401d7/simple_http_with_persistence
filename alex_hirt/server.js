const http = require('http');
const router = require(__dirname + '/lib/routes');

const port = process.env.PORT || 5000;

const server = http.createServer((request, response) => {
  router(request, response);
});


server.listen(port, () => {
  process.stdout.write('Server listening on localhost:' + port + '\n');
});
