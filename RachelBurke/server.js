var http = require('http');
var url = require('url');
var fs = require('fs');
var port = 3000;

function startServer() {

  function notFound404(request, response) {
    response.writeHead(404, {'Content-Type': 'application/json'});
    response.write('{"message": "Invalid Route"}');
    response.end();
  }

  function onRequest(request, response) {
    if(request.method === 'GET') {
      if (request.url === '/' || request.url === '/index') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end();
      } else if (request.url === '/data') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        fs.readdir('./data', function(err, files) {
          response.write(JSON.stringify(files));
          response.end();
        });
      } else {
        notFound404(request, response);
      }
      } else if (request.method === 'POST') {
      if (request.url !== '/data') {
        notFound404(request, response);
      } else {

        console.log(JSON.stringify(response.body));
        response.on('data', function(chunk) {
          console.log('BODY: ' + chunk);
        });
        //finds files from directory
        fs.readdir('./data', function(err, files) {
          var fileNum = files.length +1;
          //builds new file name and writes post req data
          fs.writeFile('data/file' + fileNum + '.json', request.body + function(err) {
            if (err) throw err;
            console.log('It saved!');
          });
        });
      }
    }
  }

  http.createServer(onRequest).listen(port);
  console.log('Server up on port 3000');
}

exports.startServer = startServer;
