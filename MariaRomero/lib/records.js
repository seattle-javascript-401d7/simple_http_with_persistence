const fs = require('fs');

exports.write = function(newData) {
  var numFiles = 0;
  fs.readdir(__dirname + '/../data', (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    numFiles = files.length;
    fs.writeFile(__dirname + '/../data/jsonFile' + (numFiles + 1) + '.json', newData);
  });
};

exports.displayFiles = function(res) {
  var string = '';
  fs.readdir(__dirname + '/../data/', (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach( (file) => {
      string += file + '\n';
    });
    res.write(string);
    res.end();
  });
};
