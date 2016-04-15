const http = require('http');
const Router = require(__dirname + '/lib/router');

var router = new Router()
.get('/someurl', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg" : "hello from some url"}');
  res.end();
})
.get('/anotherurl', (req, res) => {
  res.writeHead(200);
  res.write('another url');
  res.end();
});

http.createServer(router.route()).listen(3000, () => console.log('server up'));
