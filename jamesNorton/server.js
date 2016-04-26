const http = require('http');
const fs = require('fs');

var server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/notes') {

    fs.readdir(__dirname + '/data/', (err, data) => {
      if (err) throw console.log('Eror on GET request');

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      var fileListString = data.join('\n');
      res.write('Notes in the directory are \n' + fileListString + '\n');
      return res.end();
    });
  }

  if (req.method === 'POST' && req.url === '/notes') {

     fs.readdir(__dirname + '/data/', (err, data) => {
       if (err) console.log('Error on POST request');

      var filenumber = data.length + 2;
      var writeStream = fs.createWriteStream(__dirname + '/data/' + filenumber + '.json');
      req.pipe(writeStream);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('thanks for submitting! Your file is named ' + filenumber + '.json\n');
      return res.end();
    });
  }
});

server.listen(3000, () => {
  console.log('Watching on PORT: 3000...\n');
});
