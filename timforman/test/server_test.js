const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require(__dirname + '/../server');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');
var jsonString = '{"msg": "test"}';

describe('test http server with persistence', () => {
  before(() => {
    fs.readdir('/data/', (err, data) => {
      if (err) return 'An error has occurred.';
      console.log(data);
    });
  });

  it('should run GET request', (done) => {
    request('localhost:3000')
    .get('/list')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
      server.close();
    });
  });
  it('should check POST request and return a JSON file', (done) => {
    request('localhost:3000')
    .post('/')
    .send(jsonString)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"msg": "test"}');
      expect(res.body).to.not.eql(null);
      done();
      server.close();
    });
  });
});
