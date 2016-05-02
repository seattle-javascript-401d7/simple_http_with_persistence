const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const startServer = require(__dirname + '/../server');
var server = require(__dirname + '/../index');

describe('the http server', () => {
  before((done) => {
    const testDir = __dirname + '/../simple_test';
    server = startServer(testDir, done);
  });
});
it('should accept get requests to /simple and respond with list of simple', () => {
  request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      var files = fs.readdirSync(__dirname + '/../simple_test').toString();
      expect(res.text).to.eql(files);
      done();
    });
});
it('should accept json post requests to /simple and save the body in a file', () => {
  var nextFile = fs.readdirSync(__dirname + '/../simple_test').length + 1;
  request('localhost:3000')
    .post('/simple')
    .send({ simpleBody: 'Hello World' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('saved file ' + nextFile + '.json');
      fs.readfile(__dirname + '/../simple_test/' + nextFile + '.json', (err, data) => {
        if (err) throw err;
        var parsed = JSON.parse(data);
        expect(parsed).to.eql({ noteBody: 'Hello World' });
        done();
      });
    });
});
it('should 404 on bad requests', (done) => {
  request('localhost:3000')
    .get('/badroute')
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Not Found');
      expect(res).to.have.status(404);
      expect(res.text).to.eql('404 - Page not found');
      done();
    });
});
