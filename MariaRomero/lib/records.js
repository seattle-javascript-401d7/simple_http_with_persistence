const fs = require('fs');

exports.write = function(newData) {
  var numFiles = fs.readdirSync(__dirname + '/../data').length;
  fs.writeFile(__dirname + '/../data/jsonFile' + (numFiles + 1) + '.json', newData);
};

exports.displayFiles = function() {
  var files = fs.readdirSync(__dirname + '/../data/');
  var string = '';
  files.forEach( (cv, index, array) => {
    string += cv + '\n';
  });
  return string;
};
