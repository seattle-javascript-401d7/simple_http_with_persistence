const http = require('http');
const Router = require(__dirname + '/lib/router.js');
const fs = require('fs');
var list;

var router = new Router()
  .get('/notes', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readdir('/data', (err, data) => {
      if (err) return err;

      return list = data;
    });
    res.write('<h2> The files in the log are:<h2> <p>' + list + '</p>');
    res.end();
  })
  .post('/notes', (req, res) => {
    var date = new Date();
    req.on('data', (data) => {
      fs.writeFile('/data/' + date + '.json', data, (err) => {
        if (err) throw err;
      });
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Data logged to: /data/' + date + '.json');
    res.end();
  });

http.createServer(router.route().listen(7000, () => {
  console.log('server listening on port 7000');
}));
