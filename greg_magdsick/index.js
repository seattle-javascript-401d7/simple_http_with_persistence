const http = require('http');
const Router = require(__dirname + '/lib/router.js');
const fs = require('fs');
var list;

var router = module.exports = exports = new Router()
  .get('/notes', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readdir('/data', (err, data) => {
      if (err) return err;

      return list = data;
    });
    res.write('The files in the log are: ' + list);
    res.end();
  })
  .post('/notes', (req, res) => {
    var time = new Date().getTime();
    req.on('data', (data) => {
      fs.writeFile(__dirname + '/data/' + time + '.json', data, (err) => {
        if (err) throw err;
      });
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Data logged to: /data/' + time + '.json');
    res.end();
  });

http.createServer(router.route()).listen(7000, () => {
  console.log('server listening on port 7000');
});
