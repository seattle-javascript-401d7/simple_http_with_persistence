'use strict';
const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const server = require(__dirname + '/../server');

describe('HTTP Server', () => {
  it('should accept a GET request to /data', (done) => {
    request('localhost:3000')
    .get('/data')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should log json content into file', (done) => {
    request('localhost:3000')
    .post('/data')
    .send({ 'name': 'Phillip', 'occupation': 'student' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.msg).to.eql('success');
      done();
    });
  });

  after((done) => {
    server.close(() => {
      done();
    });
  });
});
