const fs = require('fs');

function routes(request, response) {
  if (request.url === '/rumothoughts' && request.method === 'GET') {
    var parseThoughtsUgly = function() {
      var rumoThoughts = fs.readdirSync(__dirname + '/../data');
      var folder = rumoThoughts;
      return function() {
        var allThoughts = {};
        for (var i = 0; i < folder.length; i++) {
          var rawThought = fs.readFileSync(__dirname + '/../data/' + folder[i]);
          var regularThought = JSON.parse(rawThought);
          allThoughts['thought' + i] = regularThought.thought;
        }
        var jsonThoughts = JSON.stringify(allThoughts);
        fs.writeFile(__dirname + '/../master/allThoughts.json', jsonThoughts, (error) => {
            if (error) throw error;
        });
        return response.write(jsonThoughts);
      };
    };
    response.writeHead(200, { 'Content-Type': 'application/json' });
    parseThoughtsUgly()();
    return response.end();
  }

  if (request.url === '/rumothoughts/pretty' && request.method === 'GET') {
    var parseThoughtsPretty = function() {
      var thoughts = '';
      var rumoThoughts = fs.readdirSync(__dirname + '/../data');
      var folder = rumoThoughts;
      return function() {
        for (var i = 0; i < folder.length; i++) {
          var rawThought = fs.readFileSync(__dirname + '/../data/' + folder[i]);
          var parseThought = JSON.parse(rawThought);
          thoughts += '<p style="font-size: 2em">' + parseThought.thought + '<p>';
        }
        return thoughts;
      };
    };
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<h1>Today Rumo had these thoughts</h1>');
    response.write('<p>' + parseThoughtsPretty()() + '</p>');
    return response.end();
  }

  if (request.url === '/rumothoughts' && request.method === 'POST') {
    var numThoughts = fs.readdirSync(__dirname + '/../data');
    var counter = numThoughts.length;
    request.on('data', (data) => {
      var saveThought = function() {
        counter += 1;
        fs.writeFile(__dirname + '/../data/thought' + counter + '.json', data, (error) => {
          if (error) throw error;
        });
      };
      saveThought();
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('<h1>Rumo is thinking! YAY for thoughts!</h1>');
      return response.end();
    });
    return;
  }
}

module.exports = routes;
