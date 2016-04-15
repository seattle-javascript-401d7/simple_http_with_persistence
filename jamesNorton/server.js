const http = require('http');
const fs = require('fs');

var server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/notes') {

    res.writeHead(200, {'Content-Type': 'text/plain'});

    var fileList = fs.readdirSync(__dirname + '/data/');

    var fileListString = fileList.join(', ')

    res.write('Notes in the directory are ' + fileListString + '\n')
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/notes') {
    var fileList = fs.readdirSync(__dirname + '/data/');
    var filenumber = fileList.length + 1;

    var writeStream = fs.createWriteStream(__dirname + '/data/' + filenumber + '.json');

    req.pipe(writeStream);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('thanks for submitting!');
    return res.end();
  }

});

server.listen(3000, () => {
  console.log('Watching on PORT: 3000...\n');
});
