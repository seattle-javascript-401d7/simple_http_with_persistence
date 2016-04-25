/* esling-env mocha */
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');
require(__dirname + '/../lib/server');

describe('a GET request', () => {
  var string = '';
  before( () => {
    var fileArray = fs.readdirSync(__dirname + '/../data');
    fileArray.forEach( (file) => {
      string += file + '\n';
    });
  });
  it('should respond w/ the list of files in the data directory', (done) => {
    request('localhost:3000')
    .get('/records')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql(string);
      done();
    });
  });
});

describe('a POST request', () => {
  before( (done) => {
    request('localhost:3000')
    .post('/records')
    .send({ 'writeTest': 'newText' })
    .end( () => {
      done();
    });
  });
  it('should write the body of the POST request to a file in the data directory', (done) => {
      var fileArray = fs.readdirSync(__dirname + '/../data');
      var index = fileArray.length - 1;
      var fileContent = fs.readFileSync(__dirname + '/../data/' + fileArray[index], 'utf8');
      expect(fileContent).to.eql('{"writeTest":"newText"}');
      done();
  });
});

describe('the server', () => {
  it('should accept GET requests to /records', (done) => {
    request('localhost:3000')
    .get('/records')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });
  it('should accept POST requests to /records', (done) => {
    request('localhost:3000')
    .post('/records')
    .send({ 'writeTest': 'newText' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('file written');
      done();
    });
  });
  it('should 404 on bad requests', (done) => {
    request('localhost:3000')
    .get('/badRoute')
    .end( (err, res) => {
      expect(err).to.not.eql(null);
      expect(res.status).to.eql(404);
      expect(res.text).to.eql('error 404: not found');
      done();
    });
  });
});
