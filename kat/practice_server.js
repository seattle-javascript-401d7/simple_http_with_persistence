const http = require('http');

const Router = require(__dirname + '/router');

var routes = new Router();
routes.get('/someurl', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{ "msg" : "hello from url"}');
  res.end()
});

routes.get('/anotherurl', (req, res) => {
  res.writeHead(200);
  res.write('another url');
  res.end()
})

http.createServer(routes.route()).listen(3000, () => console.log('server up'))
