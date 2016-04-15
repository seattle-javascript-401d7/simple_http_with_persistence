var slothbear = require(__dirname + '/server');

module.exports = exports = slothbear.server(process.argv[2] || 3000,
  process.argv[3] || __dirname + '/data');
