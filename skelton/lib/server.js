const http = require('http');
const fs = require('fs');
const Router = require(__dirname + '/router.js');

var dataPath = __dirname + '/../data/';
var router = new Router()
.get('/awesomeUrl', (req, res) => {
  console.log(dataPath);
  fs.readdir(dataPath, (err, files) => {
    console.log(files);
    if (err) return process.stdout.write(err);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(JSON.stringify(files));
    res.end();
  });
})
.post('/awesomeUrl', (req, res) => {
  fs.readdir(dataPath, (err, files) => {
    if (err) return process.stdout.write(err);
    req.on('data', (data) => {
      console.log(data);
      fs.writeFile(dataPath + files.length + '.json', data, (err) => {
        if (err) process.stdout.write(err);
      });
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(data + ' was saved');
      res.end();
    });
  });
});

const server = http.createServer(router.route());

server.listen(3030, () => {
  process.stdout.write('server up on 3030\n');
});
